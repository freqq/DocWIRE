#!/bin/bash

set -e

source common/constants.sh

cd ../../quality/src/test_runner/

python3 run.py --tests-dir=tests --config-file=config/config.yaml --host=$MINIKUBE_IP $@
