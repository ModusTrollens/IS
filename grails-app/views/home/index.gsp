<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<meta name="author" content="Manuel Ignacion Castillo" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Clases ingl&eacute;s</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'modustrollens.js')}" ></script>
		<g:if test="${record}">
			<script type="text/javascript">
				$(document).ready(function() {
					showMessageS(null, 'Success:  <br />' + "${'Se ha creado correctamente el ' + ((type == 'student')? 'Estudiante' : 'Profesor')}", (10 * 1000), 0, 0, '', 'showSuccess');
				});
			</script>
		</g:if>
	</head>
	<body>
		<div id="header" >
			<div id="session_links" >
				<g:if test="${userInstance}">
					<a href="${createLink(action:uaction, controller:ucontroller)}">Cuenta</a><br/>
					<a href="${createLink(action:'logout', controller:'session')}">Cerrar session</a><br/>
				</g:if>
				<g:else>
					<a href="${createLink(action:'login', controller:'session')}">Acceso usuarios</a><br/><br/>
				</g:else>
				<a href="${createLink(action:'register', controller:'professor')}" >Registro Profesor</a>
      		</div>
      		<p>Escuela de ingl&eacute;s a distancia</p>
      		Inicio
     	</div>
    	<div id="container">
			<div id="des">
				<p>Escuela a distancia <b><i>Cursos de ingl&eacute;s</i></b></p>
				<br />
				<p> Selecciona el nivel deseado</p>
			</div>
			<table id="ing_level">
				<tr><td><button id="lvl1" type="button" onclick="goTo('${createLink(controller:'course')}/?level=0')">Principiante</button></td></tr>
				<tr><td><button id="lvl2" type="button" onclick="goTo('${createLink(controller:'course')}/?level=1')">Intermedio</button></td></tr>
				<tr><td><button id="lvl3" type="button" onclick="goTo('${createLink(controller:'course')}/?level=2')">Avanzado</button></td></tr>
				<tr><td><button id="lvl4" type="button" onclick="goTo('${createLink(controller:'course')}/?level=3')">Conversación</button></td></tr>
			</table>
   		</div>
    	<div id="footer" >
				<i>S&uacute;per RegisTROLL 5000</i><br/>
			&#xa9; <i>Modus Trollens</i> -1986<br/>
				<h1 id="optimized-for" >
				&Eacute;sta p&aacute;gina se visualiza mejor con
				<i>Mozzila FireFox</i>
			</h1>
		</div>
	</body>
</html>