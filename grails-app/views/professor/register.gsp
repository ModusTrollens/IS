<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<meta name="author" content="Manuel Ignacion Castillo" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Registro profesor</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js"></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'professor.js')}" ></script>
		<script type="text/javascript">
			var home = "${createLink(uri: '/', absolute : 'true')}";
		</script>
	</head>
	  <body>
    	<div id="header" class="main">
      		<div id="inf">
				<p>Bienvenido a Registroll 5000</p>
				<a href="${createLink(uri: '/', absolute : 'true')}" >Inicio</a>
      		</div>
     	</div>
    	<div id="container">
			<div id="des">
				<p>Registro profesor</p>
			</div>
			<g:form id="regis_wannabie" url="[resource:wannabieInstance, action:'save']"  enctype="multipart/form-data">
				<br />
				<p> Datos profesor: </p>
				<table id="wannabie_table">
					<tr><td class="wannabie_inf">Nombre: </td><td class="wannabie_inf_input"><g:textField name="name" maxlength="100" placeholder="Nombre profesor" required="" /></td></tr>
					<tr><td class="wannabie_inf">Correo: </td><td class="wannabie_inf_input"><g:field type="email" name="email" placeholder="email@organización.com" maxlength="100" required="" /></td></tr>
					<tr><td class="wannabie_inf">Contraseña: </td><td class="wannabie_inf_input"><g:passwordField name="password" maxlength="100" placeholder="Contraseña" required="" /></td></tr>
					<tr><td class="wannabie_inf">Repetir Contraseña: </td><td class="wannabie_inf_input"><g:passwordField name="repassword" maxlength="100" placeholder="Re-Contraseña" required="" /></td></tr>
					<tr><td class="wannabie_inf">Constancia: </td><td class="wannabie_inf_input"><input type="file" id="pdffile" name="pdf" required="" /></td></tr>
				</table>
				<br />
				<hr>
				<br />
				<p> Datos del curso: </p>
				<table id="course_table">
					<tr><td class="course_inf">Nivel: </td><td class="course_inf_input"><g:select name="courselvl" keys="${[0,1,2,3]}" from="${['Principiante', 'Intermedio', 'Avanzado', 'Conversación']}" noSelection="['':'-Selecciona un nivel-']"  required=""/></td></tr>
					<tr><td class="course_inf">Dias: </td><td class="course_inf_input"><g:textField placeholder="Lunes-Viernes, Lunes, Martes" name="coursedays" required="" /></td></tr>
					<tr><td class="course_inf">Horas: </td><td class="course_inf_input"><g:textField name="coursehours" placeholder="13:00-14:00, 09:00-12:00" required="" /></td></tr>
					<tr><td class="course_inf">Video: </td><td class="course_inf_input"><input type="file" id="video" name="coursevideo" required="" /></td></tr>
				</table>
				<br />
				<table id ="send_wannabie">
				<tr><td></td><td colspan="2"><g:submitButton name="new_wannabie" value="Registrar" /></td></tr>
				</table>
				<br/>
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
