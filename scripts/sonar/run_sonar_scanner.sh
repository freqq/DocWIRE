#!/bin/bash

set -e

source ../common/logger.sh

readonly MINIKUBE_IP=$(minikube ip)
readonly SONAR_PROJECT="DocWIRE"
readonly SONAR_PROJECT_VERSION='1.0.0'
readonly SONAR_PROJECT_KEY='DocWIRE'
readonly SONAR_LOG_DIR='./sq-log'
readonly SONAR_HOST_URL="http://$MINIKUBE_IP:31500"

function run_sonar_scanner {
    log_info "Starting sonar-scanner"

    cd ../../application/components/

    sonar-scanner \
        -Dsonar.host.url=${SONAR_HOST_URL} \
        -Dsonar.login=${SONAR_USER} \
        -Dsonar.password=${SONAR_PASS} \
        -Dsonar.projectName=${SONAR_PROJECT} \
        -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
        -Dsonar.projectVersion=${SONAR_PROJECT_VERSION} \
        -Dsonar.issuesReport.html.location=${SONAR_LOG_DIR} \
        -Dsonar.java.source=1.11 \
        -Dsonar.exclusions=**/docker/www/libs/**/*,**/docker/www/wulfdist/**/*,**/rpmbuild,**/docker/www/generated/**/*,**/*.json,**/*.yml,**/*.xml,**/node_modules/**/*,**/build/node_modules/**/*,**/__init__.py,**/test/**,**/tests/** \
        -Dsonar.dynamicAnalysis=reuseReports \
        -Dsonar.java.coveragePlugin=jacoco \
        -Dsonar.java.binaries=build/classes \
        -Dsonar.jacoco.reportPath=build/jacoco/test.exec \
        -Dsonar.jacoco.itReportPath=build/jacoco/test.exec \
        -Dsonar.jacoco.reportMissing.force.zero=true \
        -Dsonar.groovy.codenarc.reportPath=build/reports/codenarc/test.xml \
        -Dsonar.javascript.lcov.itReportPath=coverage/lcov.info \
        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
        -Dsonar.modules=account-service,appointments-service,frontend,messages-service,notifications-service,payment-service  \

    log_info "sonar-scanner finished"
}

run_sonar_scanner
