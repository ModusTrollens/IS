<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es" >
    <head>
            <title>Error - P&aacute;gina no encontrada</title>
            <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
            <meta name="author" content="Manuel Ignacio Castillo L&oacute;pez Nachintoch" />
            <meta name="author" content="Modus Trollens" />
            <link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
			<link rel="stylesheet" type="text/css" href="${createLinkTo(dir:'css',file:'trollens_style.css')}" />
			<script type="text/javascript" src="${createLinkTo(dir:'js',file:'jquery-1.11.0.min.js')}" ></script>
    </head>
    <body >
    	<div id="header" >
    		<div id="session_links" >
				<a href="${createLink(action:'login', controller:'session')}">Acceso usuarios</a><br/><br/>
				<a href="${createLink(action:'register', controller:'professor')}" >Registro Profesor</a>
      		</div>
      		Se ha encontrado a NYAN
    		<p><a href="${createLink(uri: '/', absolute : 'true')}" >Inicio</a></p>
    	</div>
    	<div>
    		<h1 class="not-found" >404<p/>
    		NYAN FOUND!</h1>
    	</div>
    	<audio id="player_intro" src="${createLinkTo(dir:'sounds',file:'nyan-cat-intro.ogg')}" type="audio/ogg" ></audio>
    	<audio id="player_song" src="${createLinkTo(dir:'sounds',file:'nyan-cat.ogg')}" type="audio/ogg" ></audio>
    	<div id="nyan-cat" class="nyan" >
    		<img src="${createLinkTo(dir:'images',file:'nyan-cat-animated.gif')}" alt="NYAN!" width="800" height="800" />
    	</div>
    	<div id="footer" style="margin-top: 45%;" >
			<i>S&uacute;per RegisTROLL 5000</i><br/>
			&#xa9; <i>Modus Trollens</i> -1986<br/>
			<h1 id="optimized-for" >
				&Eacute;sta p&aacute;gina se visualiza mejor con
				<i>Mozzila FireFox</i>
			</h1>
		</div>
    	<script type="text/javascript" >
    	<!--
    		var playeri = document.getElementById("player_intro");
    		var players = document.getElementById("player_song");
    		players.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
			playeri.play();
    		window.setTimeout(function() {
    			players.play();
    			$("#nyan-cat").show();
    		}, 3500);
    	-->
    	</script>
    </body>
</html>

