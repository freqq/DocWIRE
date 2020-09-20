#!/bin/bash

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function enable_ingres_on_minikube() (
    minikube addons enable ingress
)

function app_start() (
    echo "Starting application..."

    cd ${SOURCE_DIR}/../application

    ./gradlew charts:namespace:appInstall
    ./gradlew charts:account-service:appLoad
    ./gradlew charts:account-service:appInstall
    ./gradlew charts:frontend:appLoad
    ./gradlew charts:frontend:appInstall

    cd -
    echo "Online doctor app started."
)

enable_ingres_on_minikube
app_start
