#!/bin/bash

set -e

function run_stripe_cli() {
    MINIKUBE_IP=$(minikube ip)
    stripe listen --forward-to $MINIKUBE_IP/api/payment/webhook/checkout
}

run_stripe_cli