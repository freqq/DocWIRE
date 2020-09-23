#!/bin/bash

set -eE

cd ../quality/src/test_runner/

python3 run.py --tests-dir=tests --config-file=config/config.yaml $@
