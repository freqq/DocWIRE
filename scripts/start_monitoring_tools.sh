#!/bin/bash

source common/logger.sh
source common/constants.sh

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function app_start() {
    log_info "Starting monitoring tools..."

    cd ${SOURCE_DIR}/../application

    ./gradlew charts:monitoring-namespace:appInstall

    ./gradlew charts:prometheus:appInstall
    ./gradlew charts:grafana:appInstall

    cd -
}

function main() {
    app_start

    log_info "Monitoring tools started."
    log_info "Grafana available at: http://${MINIKUBE_IP}:31000"
    log_info "Prometheus available at: http://${MINIKUBE_IP}:32000"
}

main