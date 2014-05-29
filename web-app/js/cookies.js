/**
 * Define las funciones necesarias para el correcto funcionamiento
 * todas operaciones de las cookies de registroll 5000.
 * @author Manuel Ignacio Castillo López "Nachintoch" <teshanatsch@gmail.com>
 * @author Mijail Gutiérrez Valdez
 * @author Modus Trollens
 * @version 1.0, febrero 2014
 */


/*
 * Devuele el valor de una cookie segun su nombre name
 * @param {String} name
 * @return {String} value
 */
function getCookie(name){
	var cname = name + "=";
  	var begin = document.cookie.indexOf(cname);       
    if (begin != -1) {           
    	begin += cname.length;       
      	end = document.cookie.indexOf(";", begin);
      	if (end == -1) {
      		end = document.cookie.length;
      	}
        return unescape(document.cookie.substring(begin, end));
  	}
  	return null;
}


/*
 * asigna una cookie con el nombre name, y valor value, a esto
 * se le agrega la fecha de expiracion, la ruta, el dominio u un valor
 * que indica requiere transmisión segura.
 * @param {String} name, el nombre de la cookie
 * @param {String} value, el valor que tendra
 * @param {String} expiresDays, el tiempo a expirar end dias, por defecto el final de la sesión
 * @param {String} path, la ruta por defecto la ruta del documento que hace la llamada
 * @param {String} domain, el dominio donde se creo la cookie
 * @parma {Boolean} secure, indica se requiere una transmisión segura
 * @return {Undefined}
 */
function setCookie(name, value, expiresDays, path, domain, secure) {
  var expd = new Date();
  expd.setTime(expd.getTime() + (expiresDays * 24 * 60 * 60 * 1000));// microsegundos * seg * min * hor  
  var cookie = name + "=" + escape(value) + 
  ((expires == null) ? "" : "; expires=" + expd.toGMTString()) +
  ((path == null) ? "" : "; path=" + path) +
  ((domain == null) ? "" : "; domain=" + domain) +
  ((secure == null) ? "" : "; secure");
  document.cookie = cookie;
}