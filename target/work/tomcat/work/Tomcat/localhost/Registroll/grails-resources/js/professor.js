/**
 * Define las funciones necesarias para el correcto funcionamiento
 * del registro de profesores de registroll 5000.
 * @author Manuel Ignacio Castillo López "Nachintoch" <teshanatsch@gmail.com>
 * @author Mijail Gutiérrez Valdez
 * @author Modus Trollens
 * @version 1.0, febrero 2014
 */

var pdfCheck = false;
var videoCheck = false;

/*
 * Al cargar el documento se inserta la función para el manejo
 * errores al llenar la forma para registra a un postulante a profesor
 */
$(document).ready(function() {
	$("#regis_wannabie").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		createWannabie(this, null, 0, false);
	});

	$("#accept_wannabie").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		acceptWannabie(this);
	});

	$("#edit_professor").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		editProfessor(this);
	});

	$("#start_course").click(function(event) {
		event.preventDefault();
		startCourse(this);
	});

	$("#end_course").click(function(event) {
		event.preventDefault();
		$("#overlay").fadeIn("slow");
		$("#overlay_ratings_students").fadeIn("slow");
	});

	$("#rating_students").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		setRatings(this);
	});

   $(document.body).keydown(function(event) {
		if(event.which == 27) {
			$("#overlay").fadeOut("slow");
			$("#overlay_ratings_students").fadeOut("slow");
		}
	});

	$(".close_overlay").click(function() {
		$("#overlay").fadeOut("slow");
		$("#overlay_ratings_students").fadeOut("slow");
	});

	$("#delete_professor").submit(function(event) {
		event.preventDefault();//se detiene el envió de la forma
		deleteProfessor(this);
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
 * Válida que el archivo sea un pdf y que este sea menor a 10MB
 * @param {DOMElement} form
 * @param {FileReader} fReader
 * @param {Int} num
 * @param {Boolean} vpdf
 * @returns {undefined}
 */
function validate_pdf(form, fReader, num) {
    if(!fReader) {
    	var file = form.pdf.files[0];
		var reader = new FileReader();
		if (file.webkitSlice) {
      		var blob = file.webkitSlice(1, 4);
    	} else if (file.slice) {
      		var blob = file.slice(1, 4);
    	}
    	reader.readAsBinaryString(blob);
    	setTimeout(function() { validate_pdf(form, reader, num + 1);}, 50);
    	return;
    }
    if(fReader.readyState < 2) {
    	setTimeout(function() { validate_pdf(form, fReader, num + 1);}, 50);
    	return;
    }
    if(num > 3) {
    	showMessageS(form.pdf, 'Imposible comprobar el archivo', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    	console.error('type de archivo: ' + fReader.result);
       	return;
    }
    if(fReader.result != "PDF") {
       	showMessageS(form.pdf, 'El archivo debe ser un pdf', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
       	console.error('type de archivo: ' + fReader.result);
       	return;
    }
    if(form.pdf.files[0].size > (10 * 1024 * 1024)) {
    	showMessageS(form.pdf, 'El archivo es mayor a 10MB', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    	return;
    }
    console.log('type de archivo: ' + fReader.result);
    pdfCheck = true;
    createWannabie(form);
}//validate_pdf

/**
 * Válida que el archivo sea un video y que este sea menor a 10MB
 * @param {DOMElement} form
 * @param {FileReader} fReader
 * @param {Int} num
 * @returns {undefined}
 */
function validate_video(form, fReader, num) {
    if(!fReader) {
    	var file = form.coursevideo.files[0];
		var reader = new FileReader();
		if (file.webkitSlice) {
      		var blob = file.webkitSlice(0, 3);
    	} else if (file.slice) {
      		var blob = file.slice(0, 3);
    	}
    	reader.readAsBinaryString(blob);
    	setTimeout(function() { validate_video(form, reader, num + 1);}, 50);
    	return;
    }
    if(fReader.readyState < 2) {
    	setTimeout(function() { validate_video(form, fReader, num + 1);}, 50);
    	return;
    }
    if(num > 3) {
    	showMessageS(form.coursevideo, 'Imposible comprobar el archivo', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    	console.error('type de archivo: ' + fReader.result);
       	return;
    }
    if(fReader.result != "Ogg") {
       	showMessageS(form.coursevideo, 'El archivo debe ser un ogg', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
       	console.error('type de archivo: ' + fReader.result);
       	return;
    }
    if(form.coursevideo.files[0].size > (10 * 1024 * 1024)) {
    	showMessageS(form.pdf, 'El archivo es mayor a 10MB', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
    	return;
    }
    console.log('type de archivo: ' + fReader.result);
    videoCheck = true;
    createWannabie(form);
}//validate_video


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
 * Válida que el horario de dias sea valido.
 * @param {DOMElement} inputDays
 * @returns {Boolean}
 */
function validate_days(inputDays) {
	if(/^((lunes|martes|miercoles|jueves|viernes|sábado|domingo)(\-|,)(lunes|martes|miercoles|jueves|viernes|sábado|domingo)|,)+$/i.test(inputDays.value) &&
	   inputDays.value.charAt(0) != ',' && inputDays.value.charAt(inputDays.value.length) != ',') {
		return true;
	}
	showMessageS(inputDays, 'El horario de dias no es valido', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
	return false;
}//validate_days

/**
 * Válida que el horario de horas sea valido.
 * @param {DOMElement} inputHours
 * @returns {Boolean}
 */
function validate_hours(inputHours) {
	if(/^((([01]?[0-9]|[02]?[0-3]):[0-5][0-9]\-([01]?[0-9]|[02]?[0-3]):[0-5][0-9])|,)+$/.test(inputHours.value) &&
	   inputHours.value.charAt(0) != ',' && inputHours.value.charAt(inputHours.value.length) != ',') {
		return true;
	}
	showMessageS(inputHours, 'El horario de dias no es valido', (5 * 1000), 15, 0, 'input-error', 'messageInputE');
	return false;
}//validate_days

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
 * si se define cono existente posF el div mensaje tomara posicion
 * Fix, y si se asigna un alemento valido a scrollDiv este scroll
 * se movera en lugar de todo el cuerpo.
 * @param {DOMElement} obj
 * @param {String} msj
 * @param {Int} time
 * @param {Int} posx
 * @param {Int} posy
 * @param {String} class
 * @param {Boolean} posF
 * @param {DOMElement} scrollDiv
 * @returns {undefined}
 */
function showMessageS(obj, msj, time, posx, posy, classObj, classMess, posF, scrollDiv) {
	var message = document.createElement('div');
	if(posF) {
		message.style.position= 'fixed';
	} else {
		message.style.position= 'absolute';
	}
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
	if(scrollDiv) {
	    $("html, body").animate({ scrollTop: '0px' });
		$(("#" + scrollDiv)).animate({ scrollTop: ((pos.y - 50) + 'px') });
	} else {
		$("html, body").animate({ scrollTop: ((pos.y - 50) + 'px') });
	}
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
 * para crear un nuevo postulante a profesor
 * @para {DOMElement} form
 */
 function createWannabie(form) {
 	if(!pdfCheck) {
 		validate_pdf(form, null, 0);
 		return;
 	}
 	if(!videoCheck) {
 		validate_video(form, null, 0);
 		return;
 	}
 	pdfCheck = false;
 	videoCheck = false;
 	if(validate_email(form.email) &&
 	   (! validate_existEmail(form.email)) &&
 	   validate_days(form.coursedays) &&
 	   validate_hours(form.coursehours) &&
 	   validate_pass(form.password, form.repassword)) {
 	   var password = CryptoJS.SHA3(form.password.value, { outputLength: 512 });
 	   var formData = new FormData();
 	   formData.append('name', form.name.value);
 	   formData.append('email', form.email.value);
 	   formData.append('password', password);
 	   formData.append('pdf', form.pdf.files[0]);
 	   formData.append('courselvl', form.courselvl.value);
 	   formData.append('coursedays', form.coursedays.value);
 	   formData.append('coursehours', form.coursehours.value);
 	   formData.append('coursevideo', form.coursevideo.files[0]);
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
        	 	alert("El aspirante a profesor se ha creado correctamente");
        	 	goTo(home + '?record=true&type=professor')
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

/*
 * Envía los datos necesarios para aceptar a un postulante
 * @para {DOMElement} form
 * @return {undefined}
 */
function acceptWannabie(form) {
 	var formData = new FormData();
 	formData.append('accept', true);
 	formData.append('professor', form.professor.value);
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
        	alert("El profesor se ha aceptado correctamente");
        		$(form).fadeOut("fast");
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


/*
 * Envía los datos necesarios para iniciar un curso
 * @para {DOMElement} button
 * @return {undefined}
 */
function startCourse(button) {
 	var formData = new FormData();
 	formData.append('startcourse', true);
 	var envio = $.ajax({
 	   					type: 'POST',
 	   					url: '/Registroll/professor/startCourse',
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
        	alert("Se ha inciado el curso correctamente");
        		$(button).fadeOut("fast");
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


/*
 * Envía los datos necesarios de la forma form 
 * para editar los datos de un profesor
 * @para {DOMElement} form
 * @return {Boolean}
 */
function editProfessor(form) {
	var conti = confirm("Desea modificar su registro");
 	if(!conti) {
 		return;
 	}
 	if(form.pdf.files && form.pdf.files[0] && !pdfCheck) {
 		validate_pdf(form, null, 0);
 		return;
 	}
 	pdfCheck = false;
 	if(validate_pass(form.password, form.repassword)) {
 		var formData = new FormData();
 	   	formData.append('name', form.name.value);
 	  	 if(form.password != '') {
			var password = CryptoJS.SHA3(form.password.value, { outputLength: 512 });
 	   		formData.append('password', password);
 	   	 }
 	   	if(form.pdf.files) {
 	   		formData.append('pdf', form.pdf.files[0]);
 	   	}
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
        		goTo(home + 'error/internalError/?pcontroller=professor&paction=register');
        	}
        	alert('Error:\n' + estate + '\n' + message);
        });
 	}
}



/*
 * Envía los datos necesarios de la forma form 
 * para crear calificar alos alumnos del sistema
 * @para {DOMElement} form
 */
 function setRatings(form) {
    var formData = new FormData();
    var lenInput = form.length;
    var j = 0;
    for(var i = 0; i < lenInput; i += 2) {
        if(form[i].type != "submit") {
            var id = form[i].name.substring(0, form[i].name.indexOf("."));
            formData.append(j + '-id', id);
            if(form[i].value != '') {
            	if(isNaN(parseInt(form[i].value))) {
            		showMessageS(form[i], 'La calificacion debe ser numerica', (5 * 1000), 15, 0, 'input-error', 'messageInputE', true, 'overlay_ratings_students');
            		return;
            	}
            	formData.append(j + '-rating', form[i].value);
            }
            if(form[i + 1].value != '') {
            	formData.append(j + '-comment', form[i + 1].value);
            }
            if(form[i + 1].value == '' && form[i].value == '') {
            	showMessageS(form[i], 'Se debe llenar almenos algún campo', (5 * 1000), 15, 0, 'input-error', 'messageInputE', true, 'overlay_ratings_students');
            	return;
            }
            j++;
    	}
    }
    formData.append('numberOfStudents', numberOfStudents);
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
        	 	alert("Se ha terminado el curso correctamente");
        	 	$("#overlay").fadeOut("slow");
				$("#overlay_ratings_students").fadeOut("slow");
				$("#end_course").fadeOut("slow", function() {
					var parent = this.parentNode;
					parent.removeChild(this);
				});
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

/*
 * Envía los datos necesarios para borrar a un profesor
 * @para {DOMElement} form
 * @return {undefined}
 */
function deleteProfessor(form) {
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