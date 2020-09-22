#!/bin/bash

set -e

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function enable_ingres_on_minikube() (
    minikube addons enable ingress
)

function create_role_binding() {
    kubectl create clusterrolebinding add-on-cluster-admin \
        --clusterrole=cluster-admin --serviceaccount=kube-system:default
}

function app_start() (
    echo "Starting DocWIRE..."

    cd ${SOURCE_DIR}/../application

    #./gradlew charts:namespace:appInstall

    #./gradlew charts:auth-db:appInstall
    #./gradlew charts:auth-service:appLoad
    #./gradlew charts:auth-service:appInstall

    #./gradlew charts:account-db:appInstall
    #./gradlew charts:account-service:appLoad
    #./gradlew charts:account-service:appInstall

    #./gradlew charts:frontend:appLoad
    ./gradlew charts:frontend:appInstall

    cd -
    echo "DocWIRE started."
)

enable_ingres_on_minikube
#create_role_binding
app_start
