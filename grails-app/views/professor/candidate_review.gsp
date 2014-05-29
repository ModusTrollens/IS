
<%@ page import="registroll.Professor" %>
<!DOCTYPE html>
<html>
	<head>
		<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<meta name="author" content="Manuel Ignacion Castillo" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Profesores</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'professor.js')}" ></script>
		<script type="text/javascript">
			var home = "${createLink(uri: '/', absolute : 'true')}";
		</script>
	</head>
	<body>
		<div id="header" >
			<div id="session_links" >
				<a href="${createLink(action:'login', controller:'session')}">Acceso usuarios</a><br/><br/>
				<a href="${createLink(action:'register', controller:'professor')}" >Registro Profesor</a>
      		</div>
      		<p><b>Postulante</b></p>
      		<a href="${createLink(uri: '/', absolute : 'true')}" >Inicio</a>
     	</div>
		<div id="container" >
    			<div>
    				<p>Nombre del candidato: ${professorInstance?.name}<p/>
    				<p>Correo electron&iacute;co: ${professorInstance?.email}</p>
    			</div>
    			<div>
    				<p>Carta de acreditaci&oacute;n:<p/>
    				<object data="${createLink(action:'renderPdf', controller:'professor', absolute='true')}/?id=${professorInstance?.id}" type="application/pdf" width="600" height="600">
					</object>
    			</div>
    			<div>
    				<g:if test="${professorInstance?.course?.level == 0}">
						<p>Nivel: Principiante</p>
					</g:if>
					<g:elseif test="${professorInstance?.course?.level == 1}">
    					<p>Nivel: Intermedio</p>
					</g:elseif>
					<g:elseif test="${professorInstance?.course?.level == 2}">
    					<p>Nivel: Avanzado</p>
					</g:elseif>
					<g:elseif test="${professorInstance?.course?.level == 2}">
    					<p>Nivel: Conversaci&oacute;n</p>
					</g:elseif>
    			</div>
    			<div>
    				<p>Horarios: ${professorInstance?.course?.days} - ${professorInstance?.course?.hours}</p>
    			</div>
    			<div>
    				<p>Presentaci&oacute;n</p>
    				<video width="600" height="600" controls>
    					<source src="${createLink(action:'renderVideo', controller:'course', absolute='true')}/?id=${professorInstance?.course?.id}" type="video/ogg">
    				</video>
    			</div>
    		<br />
    		<g:form id="accept_wannabie" url="${createLink(controller:'admin', action:'acceptWannabie')}"  enctype="multipart/form-data">
    			<g:hiddenField name="professor" value="${professorInstance?.id}" />
    			<g:submitButton name="send_accept" value="Aceptar" />
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
