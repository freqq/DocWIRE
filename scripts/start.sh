#!/bin/bash

source common/logger.sh
source common/constants.sh

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CA_CERTS_FOLDER=$(pwd)/.certs
MINIKUBE_IP=$(minikube ip)

function enable_ingres_on_minikube() (
    minikube addons enable ingress
)

function mount_frontend() {
    minikube mount application/components/frontend:/frontend/src
}

function generate_secrets() {
    log_info "Creating self-signed CA certificates for TLS and installing them in the local trust stores"

    rm -rf ${CA_CERTS_FOLDER}
    mkdir -p ${CA_CERTS_FOLDER}
    mkdir -p ${CA_CERTS_FOLDER}/${ENVIRONMENT_DEV}
    CAROOT=${CA_CERTS_FOLDER}/${ENVIRONMENT_DEV} mkcert -install

    log_info "Creating K8S secrets with the CA private keys (will be used by the cert-manager CA Issuer)"
    kubectl -n cert-manager create secret tls my-ca-tls-secret --key=${CA_CERTS_FOLDER}/${ENVIRONMENT_DEV}/rootCA-key.pem --cert=${CA_CERTS_FOLDER}/${ENVIRONMENT_DEV}/rootCA.pem

    log_info "Secrets generated."
}

function setup_cert_manager() {
    log_info "Setting up cert-manager..."

    cd ${SOURCE_DIR}/../application

    ./gradlew charts:cert-manager-namespace:appInstall
    generate_secrets

    kubectl apply --validate=false -f \
        https://github.com/jetstack/cert-manager/releases/download/v1.0.3/cert-manager.crds.yaml

    ./gradlew charts:cert-manager:appInstall
    ./gradlew charts:cert-manager-config:appInstall

    cd ../scripts

    log_info "Cert-manager up and running."
}

function build_custom_images() {
    log_info "Staring to build custom images ..."

    cd ${SOURCE_DIR}/../application

    ./gradlew charts:auth-service:appLoad
    ./gradlew charts:rabbit-mq:appLoad

    cd ../scripts

    log_info "Custom images built."
}

function upload_initial_users() {
    sh ./keycloak_partial_import.sh
    sh ./upload_initial_data.sh
}

function app_start() (
    log_info "Starting DocWIRE..."

    cd ${SOURCE_DIR}/../application

    ./gradlew charts:namespace:appInstall

    ./gradlew charts:auth-db:appInstall
    ./gradlew charts:auth-service:appInstall

    ./gradlew charts:account-db:appInstall
    ./gradlew charts:account-service:appLoad
    ./gradlew charts:account-service:appInstall -PminikubeIp=${MINIKUBE_IP}

    ./gradlew charts:rabbit-mq:appInstall

    ./gradlew charts:messages-db:appInstall
    ./gradlew charts:messages-service:appLoad
    ./gradlew charts:messages-service:appInstall -PminikubeIp=${MINIKUBE_IP}

    ./gradlew charts:openvidu-redis:appInstall
    ./gradlew charts:openvidu-coturn:appInstall
    ./gradlew charts:openvidu-server:appInstall -PminikubeIp=${MINIKUBE_IP}

    ./gradlew charts:appointments-db:appInstall
    ./gradlew charts:appointments-service:appLoad
    ./gradlew charts:appointments-service:appInstall -PminikubeIp=${MINIKUBE_IP}

    ./gradlew charts:frontend:appLoad
    ./gradlew charts:frontend:appInstall

    cd -
)

function main() {
    # mount_frontend
    # build_custom_images

    enable_ingres_on_minikube
    setup_cert_manager
    app_start
    upload_initial_users

    log_info "DocWIRE started."
    log_info "GUI reachable at: https://${MINIKUBE_IP}"
}

main