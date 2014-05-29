<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<meta name="author" content="Manuel Ignacion Castillo" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Editar alumno</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js"></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'student.js')}" ></script>
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
				<p>Bienvenido ${studentInstance?.name}</p>
			</div>
			<div id="alum_general_inf">
				<div id="alum_course_inf">
					<g:if test="${studentrInstance?.course?.level == 0}">
						<p>Curso nivel: Principiante</p>
					</g:if>
					<g:elseif test="${studentInstance?.course?.level == 1}">
						<p>Curso nivel: Intermedio</p>
					</g:elseif>
					<g:elseif test="${studentInstance?.course?.level == 2}">
						<p>Curso nivel: Avanzado</p>
					</g:elseif>
					<g:elseif test="${studentInstance?.course?.level == 3}">
						<p>Curso nivel: Conversaci&oacute;n</p>
					</g:elseif>
					<p>Horarios: ${studentInstance?.course?.days} - ${studentInstance?.course?.hours}</p>
					<g:if test="${!studentInstance?.course?.start}">
						<p>Estado del curso: <b style="color:red">El profesor no lo ha iniciado</b></p>
					</g:if>
					<g:elseif test="${!studentInstance?.course?.finish}">
						<p>Estado del curso: <b style="color:green">Iniciado</b></p>
					</g:elseif>
					<g:elseif test="${studentInstance?.course?.start && studentInstance?.course?.finish}">
						<p>Estado del curso: <b style="color:green">Finalizado</b></p>
						<g:if test="${studentInstance?.rating}">
							<p>${'Calificacion: ' + studentInstance?.rating}</p>
							<g:if test="${studentInstance?.rating > 5}">
								<object data="${createLink(action:'renderCons', controller:'student', absolute='true')}" type="application/pdf" width="600" height="600">
								</object>
							</g:if>
						</g:if>
						<g:elseif test="${studentInstance?.comment}">
							<p>${'Comentario: ' + studentInstance?.comment}</p>
						</g:elseif>
					</g:elseif>
				</div>
				<hr>
				<br/>
				<p style="font-weight:bold;"> Editar datos: </p>
				<g:form id="edit_student" url="${createLink(controller:'student', action:'update')}"  enctype="multipart/form-data">
					<table id="edit_student_table">
						<tr><td class="student_inf">Nombre: </td><td class="student_inf_input"><g:textField name="name" maxlength="100" placeholder="Nombre studento" value="${studentInstance?.name}"/></td></tr>
						<tr><td class="student_inf">Correo: </td><td class="student_inf_input"><g:field type="email" name="email" placeholder="email@organización.com" maxlength="100"  value="${studentInstance?.email}" disabled="" /></td></tr>
						<tr><td class="student_inf">Telefono: </td><td class="student_inf_input"><g:textField name="phone" placeholder="telefono" maxlength="10" value="${studentInstance?.phone}"/></td></tr>
						<tr><td class="student_inf">Contraseña: </td><td class="student_inf_input"><g:passwordField name="password" maxlength="100" placeholder="Contraseña" /></td></tr>
						<tr><td class="student_inf">Repetir Contraseña: </td><td class="student_inf_input"><g:passwordField name="repassword" maxlength="100" placeholder="Re-Contraseña" /></td></tr>
						<tr><td></td><td colspan="2"><g:submitButton name="edit_student_send" value="Editar" /></td></tr>
					</table>
				</g:form>
				<br />
				<hr>
				<br />
				<g:form id="delete_student" url="${createLink(controller:'student', action:'delete')}"  enctype="multipart/form-data">
					<g:submitButton name="delete_student_send" value="Borrar registro" />
				</g:form>
				<br/>
   			</div>
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
