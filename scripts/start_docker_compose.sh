#!/bin/bash

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


function app_start() (
    echo "Starting DocWIRE with help of docker-compose ..."

    cd ${SOURCE_DIR}/../application

    ./gradlew charts:account-service:appLoad
    ./gradlew charts:frontend:appLoad

    cd docker
    docker-compose up

    cd -
    echo "DocWIRE started."
)

app_start
