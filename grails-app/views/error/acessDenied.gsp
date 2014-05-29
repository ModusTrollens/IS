<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es" >
    <head>
            <title>Error - Acceso denegado</title>
            <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
            <meta name="author" content="Manuel Ignacio Castillo L&oacute;pez Nachintoch" />
            <meta name="author" content="Mijail Guti&eacute;rrez" />
            <meta name="author" content="Modus Trollens" />
            <link rel="shortcut icon" href="${createLinkTo(dir:'images',file:'icon.ico')}">
            <style type="text/css" media="all"></style>
            <style>
            	body {
					font-family: Verdana, Arial, Helvetica, sans-serif;
					margin-bottom: 10%;
					width: 100%;
					margin: 0%;
					background: whitesmoke;
				}
				a {
					text-decoration:none;
					color: white;
				}
				#header {
					background: #375C90;
					padding: 1% 0% 1% 10%;
					color: white;
				}
				#session_links {
					width: 30%;
					float: right;
					text-align: right;
					padding: 1%;
				}
				#footer {
					background: #1C1C1C;
					margin-top:5%;
					margin-bottom:3%;
					padding: 1%;
					color: white;
					text-align: center;
				}

				#optimized-for {
					font-size: 12px;
				}
            </style>
    </head>
    <body >
    	<div id="header" >
    		<div id="session_links" >
				<a href="${createLink(action:'login', controller:'session')}">Acceso usuarios</a><br/><br/>
				<a href="${createLink(action:'register', controller:'professor')}" >Registro Profesor</a>
			</div>
    		<p>Error 403 <b><i>Acceso denegado</i></b></p>
    		<g:link url="${createLink(uri: '/', absolute : 'true')}">Inicio</g:link>
    	</div>
    	<div>
    		<img src="${createLinkTo(dir:'images', file:'King_Harkinian.png')}" alt="This site is what every warrior is waiting for" width="400" height="300" style="float:left; margin: 2%; margin-left: 12%;" />
    		<h3 style="float: right; margin-top: 10%; margin-right: 15%;" >
    			Mi estimado, no deber&iacute;as estar aqu&iacute;
    		</h3>
    	</div>
    	<div id="footer" style="clear: both;" >
			<i>S&uacute;per RegisTROLL 5000</i><br/>
			&#xa9; <i>Modus Trollens</i> -1986<br/>
			<h1 id="optimized-for" >
				&Eacute;sta p&aacute;gina se visualiza mejor con
				<i>Mozzila FireFox</i>
			</h1>
		</div>
    </body>
</html>

