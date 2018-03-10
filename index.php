<?php

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
	<link rel="stylesheet" type="text/css" href="/static/web-app/loading.css" media="screen">
	<style>
		html, body {
			min-width: 100vw;
			min-height: 100%;
			background-color: #4F5152;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		body > div {
			width: 750px;
			background-color: white;
			border-radius: 2px;
			padding: 10px 15px;
		}
		.material-loader {
			--width: 100px;
			--zoom: 1;
			--green: #008744;
			--blue: #0057e7;
			--red: #d62d20;
			--yellow: #ffa700;
			position: relative;
			margin: 0px auto;
			width: var(--width);
			height: var(--width);
			transition: zoom 1s ease-in-out;
			zoom: var(--zoom);
		}

		.material-loader .circular {
			animation: rotate 2s linear infinite;
			height: var(--width);
			position: relative;
			width: var(--width);
		}


		.material-loader .path {
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
<body>
<div class="material-loader">
  <svg class="circular">
    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="5"/>
  </svg>
</div>
</body>
</html>