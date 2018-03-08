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
			border: 1px solid #000;
			border-radius: 2px;
			padding: 10px 15px;
		}
	</style>
</head>
<body>
<div>
<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REMOTE_ADDR'] === "::1") {
	putenv(Google\Auth\CredentialsLoader::ENV_VAR."=".__DIR__."/credentials/entity-inventory-a3f3735b122c.json");
}

use Google\Cloud\Datastore\DatastoreClient;

/**
 * Create a Cloud Datastore client.
 *
 * @param string $projectId
 * @return DatastoreClient
 */
function build_datastore_service($projectId)
{
    $datastore = new DatastoreClient(['projectId' => $projectId]);
    return $datastore;
}

/**
 * Create a new task with a given description.
 *
 * @param DatastoreClient $datastore
 * @param $description
 * @return Google\Cloud\Datastore\Entity
 */
function add_task(DatastoreClient $datastore, $description)
{
    $taskKey = $datastore->key('Task');
    $task = $datastore->entity(
        $taskKey,
        [
            'created' => new DateTime(),
            'description' => $description,
            'done' => false
        ],
        ['excludeFromIndexes' => ['description']]
    );
    $datastore->insert($task);
    return $task;
}
echo "\nstart2<br>\n<pre style='white-space:pre-wrap'>";
var_dump(add_task(build_datastore_service("entity-inventory"), "Hello World"));
//var_dump($_SERVER);
echo "</pre>\n<br>end2<br>\n";

?>
</div>
</body>
</html>