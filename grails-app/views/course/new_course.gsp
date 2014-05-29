
<%@ page import="registroll.Course" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<meta name="author" content="Manuel Ignacion Castillo" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Cursos nivel ${level}</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'course.js')}" ></script>
	</head>
	<body>
		<div id="header" class="main">
      		<div id="inf">
			<p>Bienvenido a Registroll 5000</p>
      		</div>
      		<a href="${createLink(uri: '/', absolute : 'true')}" >Inicio</a>
     	</div>
    	<div id="container">
			<div id="des">
				<p>Postula un curso</p>
			</div>
			<g:form id="postu_course" url="[resource:courseInstance, action:'save']"  enctype="multipart/form-data">
				<table id="postu_table">
					<tr><td class="postu_teach_inf">Nivel: </td><td id="teach_lvl"><g:field name="level" type="text" placeholder="Principiante,Intermedio,Avanzado,Conversación" value="" required="" /></td></tr>
					<tr><td class="postu_teach_inf">Dias: </td><td id="teach_days"><g:textField placeholder="Lunes-Viernes, Lunes, Martes" name="days" value="${courseInstance?.days}" required="" /></td></tr>
					<tr><td class="postu_teach_inf">Horas: </td><td id="teach_hours"><g:textField name="hours" placeholder="13:00-14:00, 09:00-12:00" value="${courseInstance?.hours}" required="" /></td></tr>
					<tr><td class="postu_teach_inf">Video: </td><td id="teach_video"><input type="file" id="video" name="video" required="" /></td></tr>
					<tr><td></td><td id="post_teach" colspan="2"><g:submitButton name="new_wannabie" value="Postular" /></td></tr>
				</table>
			</g:form>
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
