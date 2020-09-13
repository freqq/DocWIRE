#!/bin/bash

set -e

function log() {
    echo "$(date) ${*}"
}

function log_info() {
    log INFO "${*}"
}

function log_error() {
    log ERROR "${*}"
}

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function build_images {
    log_info "Starting building images..."

    ./gradlew docker:account-service:dockerPush
    ./gradlew docker:frontend:dockerPush
    ./gradlew docker:messages-service:dockerPush

    log_info "Images built successfully."
}

function app_start {
    log_info "Starting DocWIRE with help of docker-compose ..."

    cd ${SOURCE_DIR}/../application

    build_images

    cd docker && docker-compose up

    cd -
    log_info "DocWIRE started."
}

app_start
