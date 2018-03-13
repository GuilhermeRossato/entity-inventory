<?php

require_once implode(DIRECTORY_SEPARATOR, [__DIR__, "app", "classes", "Session.php"]);

if (isset($_SERVER['REQUEST_URI'])) {
	if ($_SERVER['REQUEST_URI'] !== "/") {
		return false;
	}
} else {
	return false;
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Inventario de Objetos</title>
	<style>
		html, body {
			min-width: 100vw;
			min-height: 100%;
			display: flex;
			margin: 0;
			padding: 0;
		}
		.centerize {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.content {
			background-color: white;
			box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
			border-radius: 50%;
		}
		body > div.full-page-image {
			background: #4F5152 url('http://md-pro-angular2.creative-tim.com/assets/img/login.jpeg') no-repeat center center;
			-webkit-background-size: cover;
			-moz-background-size: cover;
			background-size: cover;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			min-height: 100%;
			z-index: -1;
		}
		.startup-loader {
			--width: 100px;
			--green: #008744;
			--blue: #0057e7;
			--red: #d62d20;
			--yellow: #ffa700;
			position: fixed;
			opacity: 1;
			pointer-events: none;
			transition: opacity 0.9s ease-in-out;
			width: var(--width);
			height: var(--width);
		}

		.startup-loader .circular {
			animation: rotate 2s linear infinite;
			height: var(--width);
			position: relative;
			width: var(--width);
		}


		.startup-loader .path {
			stroke-dasharray: 1,200;
			stroke-dashoffset: 0;
			animation: dash 1.5s ease-in-out infinite,
			color 6s ease-in-out infinite;
			stroke-linecap: round;
		}

		@keyframes rotate{
			100%{
				transform: rotate(360deg);
			}
		}
		@keyframes dash{
			0%{
				stroke-dasharray: 1,200;
				stroke-dashoffset: 0;
			}
			50%{
				stroke-dasharray: 89,200;
				stroke-dashoffset: -35;
			}
			100%{
				stroke-dasharray: 89,200;
				stroke-dashoffset: -124;
			}
		}
		@keyframes color{
			100%, 0%{
				stroke: var(--red);
			}
			40%{
				stroke: var(--blue);
			}
			66%{
				stroke: var(--green);
			}
			80%, 90%{
				stroke: var(--yellow);
			}
		}
	</style>
</head>
<body class="centerize">
	<div class="content-wrapper"><div class="content"></div></div>
	<div class="full-page-image"></div>
	<div class="startup-loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="5"/></svg></div>
	<link rel="stylesheet" type="text/css" href="style/content.css" media="screen">
	<link rel="stylesheet" type="text/css" href="style/components/CardHeader.css" media="screen">
	<link rel="stylesheet" type="text/css" href="style/components/LoginForm.css" media="screen">
	<link rel="stylesheet" type="text/css" href="style/components/Button.css" media="screen">
	<link rel="stylesheet" type="text/css" href="style/components/StackedInput.css" media="screen">
	<script src="script/startup.js"></script>
	<script src="script/components/CardContent.js"></script>
	<script src="script/components/CardHeader.js"></script>
	<script src="script/components/LoginForm.js"></script>
	<script src="script/components/StackedInput.js"></script>
</body>
</html>