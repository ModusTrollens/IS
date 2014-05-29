/**
 * Define las funciones necesarias para el correcto funcionamiento
 * de la edicion del studento de registroll 5000.
 * @author Manuel Ignacio Castillo López "Nachintoch" <teshanatsch@gmail.com>
 * @author Mijail Gutiérrez Valdez
 * @author Modus Trollens
 * @version 1.0, febrero 2014
 */

/*
 * Al cargar el documento se inserta la función para el manejo
 * de funciones al editar a un postulante
 */
$(document).ready(function() {
	$("#edit_student").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		editStudent(this);
	});
	$("#delete_student").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		deleteStudent(this);
	});
})

/**
 * Redirecciona a un visitante a nivel de ingles que se desea,
 * atravez de la funcion  window.location.assign
 * @param pagina donde se dese ir
 * @returns {undefined}
 */
function goTo(page) {
    window.location.assign(page);
}

/**
 * Válida que la cadena dada represente una dirección de correo electrónico
 * válida
 * @param {DOMElement} inputMail
 * @returns {Boolean}
 */
function validate_email(inputMail) {
	if((inputMail.value.indexOf('@') > 1) &&
       (inputMail.value.lastIndexOf('.') >= inputMail.value.indexOf('@') +1) &&
       (inputMail.value.lastIndexOf('.') +1 <= inputMail.value.length)) {
       return true;
    }
    showMessageS(inputMail, 'Email incorrecto', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    return false;
}//validate_email


/**
 * Válida que las contraseñas sean iguales, de
 * ser asi regresa true, false en caso contrario.
 * @param {DOMElement} inputPass1
 * @param {DOMElement} inputPass2
 * @returns {Boolean}
 */
function validate_pass(inputPass1, inputPass2) {
	if(inputPass1.value == inputPass2.value) {
		return true;
	}
	showMessageS(inputPass2, 'La contraseña no coincide', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
	return false;
}//validate_pass

/**
 * Válida que el numero teléfonico sea correcto
 * @param {DOMElement} inputTel
 * @returns {Boolean}
 */
function validate_phone(inputPhone) {
	if(/^[1-9|\-]{8,15}$/.test(inputPhone.value)) {
       return true;
    }
    showMessageS(inputPhone, 'Número teléfonico incorrecto', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    return false;
}//validate_tel

/**
 * Muestra un mensaje posicionado en left por posx y en top
 * por posy  respecto al objeto obj un a este sele agregara
 * la clase class, la clase y el mensaje msj duraran tiempo time
 * @param {DOMElement} obj
 * @param {String} msj
 * @param {Int} time
 * @param {Int} posx
 * @param {Int} posy
 * @param {String} class
 * @returns {undefined}
 */
function showMessageS(obj, msj, time, posx, posy, classObj, classMess) {
	var message = document.createElement('div');
	message.style.position= 'absolute';
	message.style.zIndex = '99';//por defecto
	message.className = classMess;//esta clase debe de estar definida en css
	var pos = getPosition(obj);
	if(obj) {
		message.height = obj.offsetHeight + 'px';//por defecto
		message.height = obj.offsetHeight + 'px';//por defecto
		message.style.left = (pos.x + obj.offsetWidth + posx) + 'px';
		message.style.top = (pos.y + posy) + 'px';
		$(obj).addClass(classObj);
	}
	message.innerHTML = msj;
	message.style.display = 'none';
	document.body.appendChild(message);
	$("html, body").animate({ scrollTop: ((pos.y - 50) + 'px') });
	$(message).fadeIn('slow');
	setTimeout( function () {
		$(message).fadeOut('slow', function () {
			document.body.removeChild(message);
			if(obj) {
				$(obj).removeClass(classObj);
			}
		});
	}, time);
}

/**
 * Regresa la posicion x y del objeto DOM que es pasado
 * como parametro en la función
 * @param {DOMElement} obj
 * @returns {Object} {x,y}
 */
function getPosition(obj) {
	if(obj) {
		var left = obj.offsetLeft;
		var top = obj.offsetTop;
		var parentPos = getPosition(obj.offsetParent);
		left += parentPos.x;
		top += parentPos.y;
		return {x:left, y:top}
	}
	return {x:0, y:0}
}


/**
 * Funcion de progeso para el envio de la forma
 * como parametro en la función
 * @param {xhmr} progress
 * @param {DOMElement} obj
 * @returns {undefined}
 */
function progressSend(progress, obj) {	
    if(progress.lengthComputable) {
        console.log('xhr progress: ' + progress.loaded + '  max: ' + progress.total);
    }
}

/*
 * Envía los datos necesarios de la forma form 
 * para editar un studento
 * @para {DOMElement} form
 * @return {undefined}
 */
 function editStudent(form) {
 	var conti = confirm("Desea modificar su registro");
 	if(!conti) {
 		return;
 	}
 	if(validate_pass(form.password, form.repassword) &&
 	   validate_phone(form.phone)) {
 	   var formData = new FormData();
 	   formData.append('name', form.name.value);
 	   if(form.password.value != '') {
 	   		var password = CryptoJS.SHA3(form.password.value, { outputLength: 512 });
 	   		formData.append('password', password);
 	   }
 	   formData.append('phone', form.phone.value);
 	   var envio = $.ajax({
 	   						type: 'POST',
 	   						url: $(form).attr('action'),
 	   						xhr: function() {
            						var ownXhr = $.ajaxSettings.xhr();
            						if(ownXhr.upload){
                							ownXhr.upload.addEventListener('progress', function(e) {
                																	progressSend(e,null);
                															}, false);// false for asinchronous
           							}
           							return ownXhr;},
           					timeout: 5000,
 	   						data: formData,
 	   						cache: false,
 	   						contentType: false,
    						processData: false,
 	   						dataType: 'json'});
        envio.done (function (object) {
        	 if(object.error) {
        	 	showMessageS(null, 'Error:  <br />' + object.message, (5 * 1000), 0, 0, 'form-error', 'showError');
        	 	return;
        	 }
        	 if(object.success) {
        	 	alert("Se ha modificado el registro correctamente");
        	 }
        });
        envio.fail (function (object, estate, message) {
        	if(object.status && object.status == 404) {
        		goTo(home + "error/notFound");
        	}
        	if(object.status && object.status == 500) {
        		goTo(home + 'error/internalError/?pcontroller=student&paction=edit');
        	}
        	if(object.status && object.status == 405) {
   				alert('Error metodo no encontrado');
   				return;
        	}
        	alert('Error:\n' + estate + '\n' + message);
        });
 	}
}

/*
 * Envía los datos necesarios para borrar a un studento
 * @para {DOMElement} form
 * @return {undefined}
 */
function deleteStudent(form) {
	var conti = confirm("Desea borrar su registro?");
	if(!conti) {
		return;
	}
 	var formData = new FormData();
 	formData.append('delete', true);
 	var envio = $.ajax({
 	   					type: 'POST',
 	   					url: $(form).attr('action'),
 	   					xhr: function() {
            					var ownXhr = $.ajaxSettings.xhr();
            					if(ownXhr.upload){
                						ownXhr.upload.addEventListener('progress', function(e) {
                																progressSend(e,null);
                														}, false);// no asincrono
           						}
           						return ownXhr;},
           				timeout: 5000,
 	   					data: formData,
 	   					cache: false,
 	   					contentType: false,
    					processData: false,
 	   					dataType: 'json'});
    envio.done (function (object) {
    	if(object.error) {
        	showMessageS(null, 'Error:  <br />' + object.message, (5 * 1000), 0, 0, 'form-error', 'showError');
        	return;
        }
        if(object.success) {
        	alert("El registro se ha borrado exitosamente");
        	goTo(home);
        }
   	});
    envio.fail (function (object, estate, message) {
    	if(object.status && object.status == 404) {
    		goTo(home + 'error/notFound/');
        }
        if(object.status && object.status == 500) {
        	goTo(home + 'error/internalError/?pcontroller=student&paction=edit');
        }
        if(object.status && object.status == 405) {
   			alert('Error metodo no encontrado');
   			return;
        }
        alert('Error:\n' + estate + '\n' + message);
    });
}