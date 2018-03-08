<?php
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 require __DIR__ . '/vendor/autoload.php';

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
echo "\n<br>start<br>\n";
var_dump(add_task(build_datastore_service("entity-inventory")));
echo "\n<br>end<br>\n";