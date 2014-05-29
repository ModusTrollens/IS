<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<meta name="author" content="Manuel Ignacion Castillo" />
    	<meta name="author" content="Mijail Guti&eacute;rrez" />
    	<meta name="author" content="Modus Trollens" />
		<title>Acceso Usuarios</title>
		<link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
		<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha3.js"></script>
		<script type="text/javascript" src="${createLinkTo(dir:'js',file:'session.js')}" ></script>
		<script type="text/javascript">
			var home = "${createLink(uri: '/', absolute : 'true')}";
		</script>
		<g:if test="${logout}">
			<script type="text/javascript">
				$(document).ready(function() {
					showMessageS(null, 'Success:  <br />' + 'Se ha cerrado correctamente la sesion', (10 * 1000), 0, 0, '', 'showSuccess');
				});
			</script>
		</g:if>
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
				<p>Accede a la escuela</p>
			</div>
			<g:form id="login" url="${createLink(action:'authenticate', controller:'session')}">
				<table id="login_table">
					<tr><td class="user_inf">Email: </td><td class="user_inf_input"><g:field name="user" type="text" placeholder="Email de usuario" value="" id="login_nuser_input" required="" /></td></tr>
					<tr><td class="user_inf">Contraseña: </td><td class="user_inf_input"><g:passwordField name="password" maxlength="100" value="" placeholder="Contraseña usuario" id="login_puser_input" required="" /></td></tr>
					<tr><td colspan="2"><g:submitButton name="access_login" value="Acceder" /></td></tr>
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
