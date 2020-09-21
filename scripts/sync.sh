#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" && pwd )"
INPUT_PARAM_ERROR=2
DEFAULT_DIR="/home/docwire"

function log_info {
    log INFO "${*}"
}

function log_error {
    log ERROR "${*}"
}

function log {
    echo "$(date) ${*}"
}

function sync {
    rsync -Pav -e "ssh" \
        --exclude=build \
        --exclude=.gradle \
        --exclude=.git \
        --exclude=node_modules \
        ${SCRIPT_DIR}/.. ubuntu@${HOST}:${DIR}
}

function validate_parameters {
    if [ -z "${HOST}" ]; then
        log_error "--host param not set"
        display_help
        exit ${INPUT_PARAM_ERROR}
    fi
    if [ -z "${DIR}" ]; then
        log_info "--dir param not set - setting default ${DEFAULT_DIR}"
        DIR=${DEFAULT_DIR}
    fi
    if [ -z "${ID_FILE}" ]; then
        log_info "-i param not set - setting default ${DEFAULT_ID_FILE}"
        ID_FILE=${DEFAULT_ID_FILE}
    fi
}

function display_help {
    echo "Usage: $0 [option...]" >&2
    echo
    echo "   --host                host of machine to sync"
    echo "   --dir                 remote dir on host. Default value: ${DEFAULT_DIR}"
    echo
}

function parse_input_parameters {
    for i in "${@}"
    do
    case $i in
        --host=*)
        HOST="${i#*=}"
        shift
        ;;
        --dir=*)
        DIR="${i#*=}"
        shift
        ;;
        -i=*)
        ID_FILE="${i#*=}"
        shift
        ;;
        -h|--help)
        display_help
        exit 0
        ;;
        *)
        log_error "Param not supported"
        display_help
        exit ${INPUT_PARAM_ERROR}
        ;;
    esac
    done
}

function main {
    parse_input_parameters "${@}"
    validate_parameters
    sync
}

main "${@}"
