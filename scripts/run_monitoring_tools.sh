#!/bin/bash

source common/logger.sh

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function app_start() {
    log_info "Starting monitoring tools..."


    cd ${SOURCE_DIR}/../application

    ./gradlew charts:monitoring-namespace:appInstall

    ./gradlew charts:prometheus:appInstall
    ./gradlew charts:grafana:appInstall

    log_info "Monitoring tools started."
}

function main() {
    app_start
}

main