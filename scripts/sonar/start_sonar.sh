#!/bin/bash

source ../common/logger.sh
source ../common/constants.sh

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NAMESPACE="sonarqube"
SECRET_NAME="sonarqube-secret"

function generate_secret() {
    log_info "Generating sonarqube secret..."

    PASSWORD=$(openssl rand -base64 32)

    kubectl -n $NAMESPACE create secret generic $SECRET_NAME \
            --from-literal=password=$PASSWORD \

    log_info "Sonarqube secret generated."
}

function app_start() {
    log_info "Starting sonarqube..."

    cd ${SOURCE_DIR}/../../application

    ./gradlew charts:sonarqube-namespace:appInstall

    generate_secret

    ./gradlew charts:sonarqube-db:appInstall
    ./gradlew charts:sonarqube:appInstall

    cd -
}

function main() {
    app_start

    log_info "Sonarqube started."
    log_info "GUI available at: http://${MINIKUBE_IP}:31500"
}

main