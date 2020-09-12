#!/bin/bash

set -e

function log() {
    echo "$(date) ${*}"
}

function log_info() {
    log INFO "${*}"
}

function log_error() {
    log ERROR "${*}"
}

LINE='127.0.0.1 docwire.test'
FILE='/etc/hosts'

function add_line_to_hosts_file() {
    log_info "Adding 'docwire.test' entry to hosts file..."

    grep -qF -- "$LINE" "$FILE" || echo "$LINE" >> "$FILE"

    log_info "'docwire.test' entry added successfully."
}

add_line_to_hosts_file
