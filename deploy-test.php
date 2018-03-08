<?php


function deploy_project($projectName) {
	echo shell_exec("echo Y | gcloud app deploy --project=$projectName")."\n";
}

deploy_project("entity-inventory");