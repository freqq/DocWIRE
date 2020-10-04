#!/bin/bash

function log() {
    echo "$(date) ${*}"
}

function log_info() {
    log INFO "${*}"
}

function log_error() {
    log ERROR "${*}"
}
