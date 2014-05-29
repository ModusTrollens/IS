<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es" >
    <head>
            <title>Error</title>
            <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
            <meta name="author" content="Mijail Guti&eacute;rrez" />
            <meta name="author" content="Manuel Ignacio Castillo L&oacute;pez Nachintoch" />
            <meta name="author" content="Modus Trollens" />
            <link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
			<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
			<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
			<script type="text/javascript">
				$(document).ready(function() {
					document.getElementById("player").play();
				});
			</script>
    </head>
    <body >
    	<!-- audio id="player" src="/sounds/Game_Over.ogg" type="audio/ogg" ></audio -->
    	<audio id="player" src="http://www.vgmpf.com/Wiki/images/d/d7/11_-_Legend_of_Zelda_-_NES_-_Game_Over.ogg" type="audio/ogg" ></audio>
    	<div id="header" >
    		<div id="session_links" >
				<a href="${createLink(action:'login', controller:'session')}">Acceso usuarios</a><br/><br/>
				<a href="${createLink(action:'register', controller:'professor')}" >Registro Profesor</a>
      		</div>
    		<p>I'm <b><i>Error</i></b></p>
    		<a href="${createLink(uri: '/', absolute : 'true')}" >Inicio</a>
    	</div>
    	<div>
    		<img src="${createLinkTo(dir:'images', file:'i-am-error.gif')}" alt="You've met with a terrible fate, haven't you?" width="400" height="300" style="float:left; margin: 2%; margin-left: 12%;" />
    			<h3 style="float: right; margin-top: 10%; margin-right: 15%;" >
    				Ha ocurrido un error 
    				<g:if test="${pcontroller && paction}">
    						<b><g:link controller="${pcontroller}" action="${paction}" style="color: blue;">Volver</g:link></b>
    				</g:if>
    				<g:else>
    						<b><g:link style="color: blue;" url="${createLink(uri: '/', absolute : 'true')}" style="color: blue;">Volver</g:link></b>
    				</g:else>
    			</h3>
    	</div>
    	<div id="footer" style="margin-top: 26%;" >
			<i>S&uacute;per RegisTROLL 5000</i><br/>
			&#xa9; <i>Modus Trollens</i> -1986<br/>
			<h1 id="optimized-for" >
				&Eacute;sta p&aacute;gina se visualiza mejor con
				<i>Mozzila FireFox</i>
			</h1>
		</div>
    </body>
</html>

