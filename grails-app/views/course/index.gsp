
<%@ page import="registroll.Course" %>
<!DOCTYPE html>
<html>
	<head>
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
		<div id="header" >
			<div id="session_links" >
				<a href="${createLink(action:'login', controller:'session')}">Acceso usuarios</a><br/><br/>
				<a href="${createLink(action:'register', controller:'professor')}" >Registro Profesor</a>
      		</div>
      		<p>Profesores <b><i>Nivel ${level}</i></b></p>
      		<a href="${createLink(uri: '/', absolute : 'true')}" >Inicio</a>
     	</div>
		<div id="container" >
    		<table>
    			<thead>
    				<tr >
    				    <th>Profesor</th>
    					<th>Dias</th>
    				</tr>
    			</thead>
    			<tbody>
				<g:each in="${courseInstanceList}" status="i" var="courseInstance">
					<tr onclick="goTo('${createLink(action:'course_request', controller:'course', absolute="true")}/?id=${courseInstance?.id}')">
					
						<td>${courseInstance?.professor?.name}</td>
						
						<td>${fieldValue(bean: courseInstance, field: "days")}</td>
					</tr>
				</g:each>
				</tbody>
			</table>
			<br />
			<div class="pagination">
				<g:paginate total="${courseInstanceCount ?: 0}" params="${[level:levelId]}" />
			</div>
			<br />
    		<input type="button" value="&#x3c;" title="volver a niveles anteriores" onclick="goTo('${createLink(uri: '/', absolute : 'true')}')" >
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
