#!/bin/bash

set -eE

function assert_python3_command_exists {
    which python3 &>/dev/null
    if [[ $? -ne 0 ]]; then
        echo "Error: ${0} requires python3"
        exit 1
    fi
}

function install_dependencies {
    pip3 install nose-parameterized
    pip3 install pylint==1.6.5
    pip3 install wheel
    pip3 install tox

    cd ../quality/
    pip3 install .
}

assert_python3_command_exists
install_dependencies