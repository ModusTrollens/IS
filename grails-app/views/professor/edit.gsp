<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<meta name="author" content="Manuel Ignacion Castillo" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Editar profesor</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js"></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'professor.js')}" ></script>
		<script type="text/javascript">
			var home = "${createLink(uri: '/', absolute : 'true')}";
			var numberOfStudents = ${ studentInstanceCount ?: 0};
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
				<p>Bienvenido ${professorInstance?.name}</p>
			</div>
			<div id="profe_general_inf">
				<div id="profe_course_inf">
					<p style="color:#e04d0b;font-weight:bold;">Informaci&oacute;n del curso impartido:</p>
					<g:if test="${professorInstance?.course?.level == 0}">
						<p>Curso nivel: Principiante</p>
					</g:if>
					<g:elseif test="${professorInstance?.course?.level == 1}">
						<p>Curso nivel: Intermedio</p>
					</g:elseif>
					<g:elseif test="${professorInstance?.course?.level == 2}">
						<p>Curso nivel: Avanzado</p>
					</g:elseif>
					<g:elseif test="${professorInstance?.course?.level == 3}">
						<p>Curso nivel: Conversaci&oacute;n</p>
					</g:elseif>
					<p>Horarios: ${professorInstance?.course?.days} - ${professorInstance?.course?.hours}</p>
					<g:if test="${professorInstance?.course?.start == false}">
							<button type="button" id="start_course">Iniciar curso</button>
					</g:if>
					<g:elseif test="${!professorInstance?.course?.finish}">
						<button type="button" id="end_course">Finalizar curso</button>
					</g:elseif>
					<g:elseif test="${professorInstance?.course?.start && professorInstance?.course?.finish}">
						<p>Curso <b style="color:green">Finalizado</b></p>
					</g:elseif>
				</div>
				<br/>
				<hr>
				<br/>
				<p style="font-weight:bold;"> Editar datos: </p>
				<g:form id="edit_professor" url="${createLink(controller:'professor', action:'update')}"  enctype="multipart/form-data">
					<table id="edit_professor_table">
						<tr><td class="professor_inf">Nombre: </td><td class="professor_inf_input"><g:textField name="name" maxlength="100" placeholder="Nombre studento" value="${professorInstance?.name}"/></td></tr>
						<tr><td class="professor_inf">Correo: </td><td class="professor_inf_input"><g:field type="email" name="email" placeholder="email@organización.com" maxlength="100"  value="${professorInstance?.email}" disabled="" /></td></tr>
						<tr><td class="professor_inf">Contraseña: </td><td class="professor_inf_input"><g:passwordField name="password" maxlength="100" placeholder="Contraseña" /></td></tr>
						<tr><td class="professor_inf">Repetir Contraseña: </td><td class="professor_inf_input"><g:passwordField name="repassword" maxlength="100" placeholder="Re-Contraseña" /></td></tr>
						<tr><td class="wannabie_inf">Constancia: </td><td class="professor_inf_input"><input type="file" id="pdffile" name="pdf" /></td></tr>
						<tr><td></td><td colspan="2"><g:submitButton name="edit_professor_send" value="Editar" /></td></tr>
					</table>
				</g:form>
				<br />
				<hr>
				<br />
				<g:form id="delete_professor" url="${createLink(controller:'professor', action:'delete')}"  enctype="multipart/form-data">
					<g:submitButton name="delete_professor_send" value="Borrar registro" />
				</g:form>
				<br/>
   			</div>
   		</div>
   		<div id="overlay"></div>
   		<div id="overlay_ratings_students">
   			<g:if test="${!professorInstance?.course?.finish}">
   				<a class="close_overlay" href="#">[x] Close</a>
				<g:form id="rating_students" url="${createLink(controller:'professor', action:'setRating') }">
					<p><b style="color:#e04d0b;">Observaci&oacute;n:</b><br/>Si la calificaci&oacute;n de un alumno no es aprobatoria favor de escribir la razon en los comentarios</p>
					<br/>
					<table id="table_rating_students">
					    <tr><th>Nombre</th><th>Calificaci&oacute;n</th><th>Observaciones</th></tr>
						<g:each in="${studentInstanceList}" status="i" var="studentInstance">
							<tr><td class="rating_name">${studentInstance?.name}</td><td class="set_rating_student"><input type="number" name="${studentInstance?.id + '.rating'}"  class="rating" maxlength="1" size="1"></td><td><textarea name="${studentInstance?.id + '.comment'}" class="comment" rows="4" cols="50"></textarea></td></tr>
						</g:each>
							<tr><td colspan="3"><g:submitButton name="send_ratings_students" value="Asignar Calificaciones" /></td></tr>
					</table>
				</g:form>
			</g:if>
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
