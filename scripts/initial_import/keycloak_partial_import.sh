#!/bin/bash

set -e

source common/constants.sh
source common/logger.sh

function login_as_user() {
    local username=$1
    local password=$2

    log_info "Logging as user ${username}."

    RESULT=`curl \
                --insecure \
                --silent \
                --data "username=$username&password=$password&grant_type=password&client_id=admin-cli" \
                $GET_TOKEN_ENDPOINT`

    TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`

    log_info "Logged in as user ${username}."
}

function request_for_admin_token() {
    log_info "Requesting for admin authorization token..."

    login_as_user "$ADMIN_USERNAME" "$ADMIN_PASSWORD"

    log_info "Admin auth token acquired."
}

function pass_minikube_ip_to_config_json() {
    ORIGINAL_CLIENTS_JSON=$(cat ../deployment/keycloak-config-dev.json)
    SWAPPED_MINIKUBE_IP_CLIENT_JSON="${ORIGINAL_CLIENTS_JSON//MINIKUBE_IP/${MINIKUBE_IP}}"
}

function import_config() {
    log_info "Starting the import..."

    curl $PARTIAL_IMPORT_ENDPOINT \
        --silent \
        --insecure \
        -H "Content-Type: $APPLICATION_CONTENT_TYPE" \
        -H "Authorization: Bearer $TOKEN" \
        --data "$SWAPPED_MINIKUBE_IP_CLIENT_JSON" > /dev/null

    log_info "Config imported successfully."
}

function main() {
    log_info "Starting INPEAK Trainer Keycloak partial import..."

    request_for_admin_token
    pass_minikube_ip_to_config_json
    import_config

    log_info "INPEAK Trainer Keycloak partial import successfull."
}

main
