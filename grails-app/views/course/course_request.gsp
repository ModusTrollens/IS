
<%@ page import="registroll.Course" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Curso nivel ${level}</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js"></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'course.js')}" ></script>
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
				<p>Inscribir en curso</p>
			</div>
			<g:form id="course_enroll" url="#">
				<div id="course_inf">
					<div id="course_teacher"><p>Nombre profesor: ${courseInstance?.professor?.name}</p></div>
					<div id="schedule">
						<div id="days"><p>Dias: ${courseInstance?.days}</p></div>
						<div id="hours"><p>Horas: ${courseInstance?.hours}</p></div>
					</div>
					<div id="video">
						<p> Video del curso </p>
						<video width="400" height="300" controls>
							<source src="${createLink(action:'renderVideo', controller:'course', absolute='true')}/?id=${courseInstance?.id}" type="video/ogg">
						</video>
					</div>
					<div id="enroll">
						<g:submitButton name="create" id="create_student" value="Inscribir" />
					</div>
				</div>
			</g:form>
   			</div>
   			<div id="overlay"></div>
   			<div id="overlay_student">
   				<a class="close_overlay" href="#">[x] Close</a>
   				<g:form id="save_student" url="[controller:'student', action:'save']">
   					<g:hiddenField name="course_enroll" value="${courseInstance?.id}" />
   					<p> Registro alumno </p>
   					<hr>
   					<table id="student_table">
						<tr><td class="student_inf">Nombre: </td><td class="student_inf_input"><g:textField name="name" maxlength="100" placeholder="Nombre alumno" required="" /></td></tr>
						<tr><td class="student_inf">Correo: </td><td class="student_inf_input"><g:field type="email" name="email" placeholder="email@organización.com" maxlength="100" required="" /></td></tr>
						<tr><td class="student_inf">Telefono: </td><td class="student_inf_input"><g:textField name="phone" placeholder="telefono" maxlength="10" required="" /></td></tr>
						<tr><td class="student_inf">Contraseña: </td><td class="student_inf_input"><g:passwordField name="password" maxlength="100" placeholder="Contraseña" required="" /></td></tr>
						<tr><td class="student_inf">Repetir Contraseña: </td><td class="student_inf_input"><g:passwordField name="repassword" maxlength="100" placeholder="Re-Contraseña" required="" /></td></tr>
						<tr><td colspan="2"><g:submitButton name="enroll_new_student" value="Registrase" /></td></tr>
					</table>
				</g:form>
   			</div>
   			<audio id="player" type="audio/ogg" src="http://www.mariowiki.com/images/e/ec/SMB2_Choosecharacter.ogg" autoplay=""></audio>
   			<audio id="player_intro" src="${createLinkTo(dir:'sounds',file:'evolution-intro.ogg')}" type="audio/ogg" ></audio>
			<audio id="player_loop" src="${createLinkTo(dir:'sounds',file:'evolution-loop.ogg')}" type="audio/ogg" ></audio>
			<audio id="player_fanfare" src="${createLinkTo(dir:'sounds',file:'evolution-congrats.ogg')}" type="audio/ogg" ></audio>
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
