<?php

$config = [
	"project" => "entity-inventory"
];
if ((isset($_SERVER['REMOTE_ADDR'])) && ($_SERVER['REMOTE_ADDR'] === "::1") && (php_sapi_name() != 'cli')) {
	echo "This script must be run from console";
	exit(1);
}

function remove_unused_versions($projectName) {
	$res = explode("\n", shell_exec("gcloud app versions list --project=$projectName"));
	if (count($res) > 2) {
		array_shift($res);
		array_pop($res);
	}
	$deleted = 0;
	foreach ($res as $line) {
		$row = array_filter(explode(" ", $line));
		$deploy = [
			"service" => array_shift($row),
			"version" => array_shift($row),
			"traffic" => array_shift($row),
			"date" => array_shift($row),
			"status" => array_shift($row)
		];
		if ($deploy['traffic'] === "0.00") {
			$result = shell_exec("echo Y | gcloud app versions delete ".$deploy['version']." --project=$projectName");
			if (strpos($result, "done") === false) {
				echo "Error deleting deploy:\n";
				var_export($deploy);
				echo "\n";
				break;
			}
			$deleted++;
		}
	}
	if ($deleted == 0) {
		echo "No versions to delete\n";
	}
}

function deploy_project($projectName) {
	echo shell_exec("echo Y | gcloud app deploy --project=$projectName")."\n";
}

deploy_project($config['project']);
echo "------------------ END OF DEPLOY ------------------\n";
remove_unused_versions($config['project']);
echo "------------------ END OF SCRIPT ------------------\n";