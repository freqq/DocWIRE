#!/bin/bash

set -e

function run_stripe_cli() {
    MINIKUBE_IP=$(minikube ip)
    stripe listen \
        --forward-to $MINIKUBE_IP/api/payment/webhook/checkout \
        --skip-verify \
        --api-key sk_test_51HdE8mDV6EZPJrHHkftff05Uwa2RNhDQLmnzUbPHuTb4PfYJShQ2OoQHFyPyIWCe3mwL46DM7XECaO68BqDO4GaD001VY2kjNY \
        --load-from-webhooks-api
}

run_stripe_cli