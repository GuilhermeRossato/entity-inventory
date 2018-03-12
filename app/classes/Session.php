<?php

//require_once implode(DIRECTORY_SEPARATOR, [__DIR__, "app", "classes", "Session.php"]);

class Session {
	static function saveLoginSession($config, $varList) {
		$sessionResult = session_start($config);
		foreach ($varList as $sessionKey => $sessionVar) {
			$_SESSION[$sessionKey] = $sessionVar;
		}
	}
	static function start() {
		if (!self::hasStarted()) {
			session_start();
		}
	}
	static function hasStarted() {
		return (session_status() === PHP_SESSION_ACTIVE) || (!empty(session_id()) && !isset($_SESSION));
	}
	static function isValid() {
		if (!self::hasStarted()) self::start();
		return (array_key_exists("username", $_SESSION) && !empty($_SESSION['username']));
	}
	static function get($str) {
		return self::isValid()?$_SESSION[$str]:false;
	}
	static function set($str, $val) {
		if (self::isValid()) {
			$_SESSION[$str] = $val;
			return true;
		} else {
			return false;
		}
	}
	static function getUsername() {
		return self::get("username");
	}
}
