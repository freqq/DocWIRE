#!/bin/bash

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function enable_ingres_on_minikube() (
    minikube addons enable ingress
)

function build_custom_keycloak_image() {
    ./gradlew charts:auth-service:appLoad
}

function app_start() (
    MINIKUBE_IP=$(minikube ip)

    echo "Starting DocWIRE..."

    cd ${SOURCE_DIR}/../application

    #build_custom_keycloak_image

    #./gradlew charts:namespace:appInstall

    #./gradlew charts:auth-db:appInstall
    #./gradlew charts:auth-service:appInstall

    #./gradlew charts:account-db:appInstall
    #./gradlew charts:account-service:appLoad
    #./gradlew charts:account-service:appInstall -PminikubeIp=${MINIKUBE_IP}

    #./gradlew charts:rabbit-mq:appLoad
    #./gradlew charts:rabbit-mq:appInstall

    #./gradlew charts:messages-db:appInstall
    #./gradlew charts:messages-service:appLoad
    #./gradlew charts:messages-service:appInstall -PminikubeIp=${MINIKUBE_IP}

    #./gradlew charts:appointments-db:appInstall
    #./gradlew charts:appointments-service:appLoad
    #./gradlew charts:appointments-service:appInstall -PminikubeIp=${MINIKUBE_IP}

    # minikube mount application/components/frontend:/frontend/src

    #/gradlew charts:openvidu-redis:appInstall
    #./gradlew charts:openvidu-coturn:appInstall
    ./gradlew charts:openvidu-server:appInstall -PminikubeIp=${MINIKUBE_IP}

    #./gradlew charts:frontend:appLoad
    #./gradlew charts:frontend:appInstall

    cd -
    echo "DocWIRE started."
)

enable_ingres_on_minikube
app_start
