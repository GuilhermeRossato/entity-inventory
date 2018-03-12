<?php

//require_once implode(DIRECTORY_SEPARATOR, [__DIR__, "app", "classes", "MemcacheSystem.php"]);

class InnefectiveMemcache {
	public function get($key) { return false; }
	public function set($key, $value) { return false; }
	public function setOption($type, $value) { return false; }
}

class MemcacheSystem {
	static function getMemcacheInstance() {
        static $memcacheInstance = null;
		if ($memcacheInstance === null) {
			if (class_exists('Memcache')) {
				$memcacheInstance = new Memcache();
			} else {
				$memcacheInstance = new InnefectiveMemcache();
			}
		}
		return $memcacheInstance;
	}
	static function get($key) {
		return self::getMemcacheInstance()->get($key);
	}
	static function set($key, $value, $expiration=1440) {
		return self::getMemcacheInstance()->set($key, $value, 0, $expiration);
	}
	static function retrieveOrCreate($key, $genFunc) {
		$result = self::getMemcacheInstance()->get($key);
		if (!$result) {
			$result = call_user_func($genFunc);
			self::getMemcacheInstance()->set($key, $result);
		}
		return $result;
	}
}