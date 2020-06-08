#!/bin/bash

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function app_start() (
    echo "Starting application..."

    cd ${SOURCE_DIR}/../application

    ./gradlew charts:namespace:appInstall
    ./gradlew charts:frontend:appLoad
    ./gradlew charts:frontend:appInstall

    cd -
    echo "Online doctor app started."
)

app_start
