<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the SDK using the Composer autoloader
require 'vendor/autoload.php';
/*
$s3 = new Aws\S3\S3Client([
    'version' => 'latest',
    'region'  => 'us-east-1'
]);
*/
$sdk = new Aws\Sdk([
    'region'   => 'us-west-2',
    'version'  => 'latest',
    'DynamoDb' => [
        'region' => 'eu-central-1'
    ]
]);

// Creating a DynamoDb client will use the "eu-central-1" region.
$client = $sdk->createDynamoDb();

var_dump($client);

echo "<br>End of strem<br>\n";