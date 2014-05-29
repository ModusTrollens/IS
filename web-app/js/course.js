/**
 * Define las funciones necesarias para el correcto funcionamiento
 * de la inscripcion a cursos de registroll 5000.
 * @author Manuel Ignacio Castillo López "Nachintoch" <teshanatsch@gmail.com>
 * @author Mijail Gutiérrez Valdez
 * @author Modus Trollens
 * @version 1.0, febrero 2014
 */


/*
 * Al cargar el documento se inserta la función para el manejo
 * errores al llenar la forma para registra a un postulante a profesor
 */
$(document).ready(function() {
	$("#course_enroll").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		showcreateAlumn();
	});

	$(".close_overlay").click(function() {
		$("#overlay").fadeOut("slow");
		$("#overlay_student").fadeOut("slow");
		document.getElementById("player_loop").pause();
	});
	
	$(document.body).keydown(function(event) {
		if(event.which == 27) {
			$("#overlay").fadeOut("slow");
			$("#overlay_student").fadeOut("slow");
			document.getElementById("player_loop").pause();
		}
	});

	$("#save_student").submit(function(event) {
		event.preventDefault();
		createAlumn(this);
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
 * Válida que el correo no este usado por otra persona.
 * @param {DOMElement} inputEmail
 * @param {Boolean} validate
 * @returns {Boolean}
 */
function validate_existEmail(inputEmail) {
	var object = null;
	var send = {'email': inputEmail.value};
	var envio = $.ajax({
						type: 'POST',
 	   					url: "/Registroll/User/existUser",
 	   					timeout: 5000,
 	   					data: send,
 	   					async: false,
 	   					cache: false,
 	   					dataType: 'json'});
 	envio.done (function (obj) {
        	object = obj;
    });
    envio.fail (function (objeto, estado, mensaje) {
           showMessageS(inputEmail, 'Error al verificar el correo', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    });
    if(object && object.exist != null) {
    	if(object.exist) {
    		showMessageS(inputEmail, 'El correo ya existe', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    		return true;
    	} else {
    		return false;
    	}
    }
    return true;
}//validate_existEmail


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
	message.style.position= 'fixed';
	message.style.zIndex = '9999';//por defecto
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
 * Muestra el formulario de un para inscribir a un studento 
 * @return {undefined}
 */
function showcreateAlumn() {
	$("#overlay").fadeIn("slow");
	$("#overlay_student").fadeIn("slow");
	var playerl = document.getElementById("player_loop");
	var playeri = document.getElementById("player_intro");
	playerl.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	document.getElementById("player").pause();
	playeri.play();
	window.setTimeout(function() {
		playerl.play();
	}, 1000);//se espera a que termine la anterior
}

/*
 * Envía los datos necesarios de la forma form 
 * para crear un nuevo studento del curso elegido
 * @para {DOMElement} form
 * @return {Boolean}
 */
 function createAlumn(form) {
 	if(validate_email(form.email) &&
 	   validate_phone(form.phone) &&
 	   (! validate_existEmail(form.email)) && 
 	   validate_pass(form.password, form.repassword)) {
 	   var password = CryptoJS.SHA3(form.password.value, { outputLength: 512 });
 	   var formData = new FormData();
 	   formData.append('name', form.name.value);
 	   formData.append('email', form.email.value);
 	   formData.append('phone', form.phone.value);
 	   formData.append('password', password);
 	   formData.append('course', form.course_enroll.value);
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
        	 	document.getElementById("player_loop").pause();
        	 	document.getElementById("player_fanfare").play();
        	 	alert("El estudiante ha sido inscrito correctamente");
        	 	goTo(home + '?record=true&type=student')
        	 }
        });
        envio.fail (function (object, estate, message) {
        	if(object.status && object.status == 404) {
        		goTo(home + "error/notFound");
        	}
        	if(object.status && object.status == 500) {
        		goTo(home + 'error/internalError/?pcontroller=professor&paction=register');
        	}
        	alert('Error:\n' + estate + '\n' + message);
        });
 	}
}