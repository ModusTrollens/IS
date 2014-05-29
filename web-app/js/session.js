/**
 * Define las funciones necesarias para el correcto funcionamiento
 * de las sesiones de registroll 5000.
 * @author Manuel Ignacio Castillo López "Nachintoch" <teshanatsch@gmail.com>
 * @author Mijail Gutiérrez Valdez
 * @author Modus Trollens
 * @version 1.0, febrero 2014
 */


/*
 * Al cargar el documento se inserta la función para el manejo
 * errores al llenar la forma para iniciar una session
 */
$(document).ready(function() {
	$("#login").submit(function( event ) {
			event.preventDefault();//se detiene el envió de la forma
			login(this);
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
 * Envía los datos necesarios de la forma form 
 * para crear una nueva sesion
 * @para {DOMElement} form
 * @param {FileREader} fReader
 * @param {int} num
 * @return {Boolean}
 */
 function login(form) {
 	if(validate_email(form.user)) {
 	   var password = CryptoJS.SHA3(form.password.value, { outputLength: 512 });
 	   var formData = new FormData();
 	   formData.append('email', form.user.value);
 	   formData.append('password', password);
 	   var envio = $.ajax({
 	   						type: 'POST',
 	   						url: $(form).attr('action'),
 	   						xhr: function() {
            						var ownXhr = $.ajaxSettings.xhr();
            						if(ownXhr.upload){
                							ownXhr.upload.addEventListener('progress', function(e) {
                																	alert("Entrando num de bytes: " + e.total);
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
        	 if(object.success && object.redirect) {
        	 	goTo(home + object.redirect)
        	 }
        });
        envio.fail (function (object, estate, message) {
        	if(object.status && object.status == 404) {
        		goTo(home + "error/notFound");
        	}
        	if(object.status && object.status == 500) {
        		goTo(home + 'error/internalError/?pcontroller=session&paction=login');
        	}
        	alert('Error:\n' + estate + '\n' + message);
        });
 	}
}