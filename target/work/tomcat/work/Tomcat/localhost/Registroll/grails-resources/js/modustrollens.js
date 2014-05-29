/**
 * Define las funciones necesarias para el correcto funcionamiento
 * de la pagina index de registroll 5000.
 * @author Manuel Ignacio Castillo López "Nachintoch" <teshanatsch@gmail.com>
 * @author Mijail Gutiérrez Valdez
 * @author Modus Trollens
 * @version 1.0, febrero 2014
 */


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
