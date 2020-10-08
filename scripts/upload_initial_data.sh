#!/bin/bash

set -e

source common/constants.sh
source common/logger.sh

function create_users() {
    log_info "Starting to create users..."
    
    for (( i=0; i  < ${#EMAILS[@]}; ++i )); do
        log_info "Creating user with username ${USERNAMES[i]}"

        curl $USERS_ENDPOINT \
            --silent \
            --insecure \
            -H "Content-Type: $APPLICATION_CONTENT_TYPE" \
            -H "Authorization: Bearer $TOKEN" \
            --data '{
                        "username": "'${USERNAMES[i]}'",
                        "email": "'${EMAILS[i]}'",
                        "enabled": "true",
                        "credentials": [{ "type": "password", "value": "'$PASSWORD'", "temporary" :"false" }]
                    }'
    done

    log_info "All users created successfully."
}

function login_as_user() {
    local username=$1
    local password=$2

    log_info "Logging as user ${username}."

    RESULT=`curl \
                --silent \
                --insecure \
                --data "username=$username&password=$password&grant_type=password&client_id=admin-cli" \
                $GET_TOKEN_ENDPOINT`

    TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`

    log_info "Logged in as user ${username}."
}

function request_for_admin_token() {
    log_info "Requesting for admin authorization token..."

    login_as_user "$ADMIN_USERNAME" "$ADMIN_PASSWORD"

    log_info "Admin auth token acquired."
}

function save_users_into_mongo_db() {
    log_info "Starting to saving Keycloak users to account-service database..."

    log_info "Adding patients ..."

    for (( i=0; i < 2; ++i )); do
        login_as_user "${USERNAMES[i]}" "$PASSWORD"

        curl $CREATE_USER_ENDPOINT \
                --silent \
                --insecure \
                -H "Content-Type: $APPLICATION_CONTENT_TYPE" \
                -H "Authorization: Bearer $TOKEN" \
                --data '{
                            "firstName": "'$FIRST_NAME'",
                            "lastName": "'${LAST_NAMES[i]}'",
                            "birthday": "'$BIRTH_DATE'",
                            "gender": "'$GENDER'",
                            "langKey": "'$LANG_KEY'",
                            "accountType": "'${ACCOUNT_TYPES[i]}'",
                            "patientInfo": {
                                "weight": "'$WEIGHT'",
                                "height": "'$HEIGHT'",
                                "address": "'$ADDRESS'",
                                "zipCode": "'$ZIP_CODE'",
                                "city": "'$CITY'",
                                "country": "'$COUNTRY'",
                                "initialDiagnoseDone": "'$INITIAL_DIAGNOSE_DONE'",
                                "creditCardInfo": {
                                    "cvc": "'$CVC'",
                                    "number": "'$NUMBER'",
                                    "expiry": "'$EXPIRY'",
                                    "name": "'$NAME'"
                                }
                            }
                        }' > /dev/null
    done

    log_info "Patients added."
    log_info "Adding doctors ..."

    for (( i=2; i < 5 ; ++i )); do
        login_as_user "${USERNAMES[i]}" "$PASSWORD"

        curl $CREATE_USER_ENDPOINT \
                --silent \
                --insecure \
                -H "Content-Type: $APPLICATION_CONTENT_TYPE" \
                -H "Authorization: Bearer $TOKEN" \
                --data '{
                            "firstName": "'$FIRST_NAME'",
                            "lastName": "'${LAST_NAMES[i]}'",
                            "birthday": "'$BIRTH_DATE'",
                            "gender": "'$GENDER'",
                            "langKey": "'$LANG_KEY'",
                            "accountType": "'${ACCOUNT_TYPES[i]}'",
                            "doctorInfo": {
                                "title": "'$TITLE'",
                                "specialization": "'$SPECIALIZATION'",
                                "aboutMe": "'$ABOUT_ME'",
                                "price": "'$PRICE'"
                            }
                        }' > /dev/null
    done

    log_info "Doctors added."

    log_info "Saved Keycloak users to account-service database successfully."
}

function get_users_response() {
    log_info "Gettings Keycloak users array..."

    USERS_RESPONSE=`curl $USERS_ENDPOINT \
                        --silent \
                        --insecure \
                        -H "Content-Type: $APPLICATION_CONTENT_TYPE" \
                        -H "Authorization: Bearer $TOKEN"`

    log_info "Keycloak users fetched successfully."
}

function get_roles_response() {
    log_info "Gettings Keycloak realm roles array..."

    REALM_ROLES_RESPONSE=`curl $REALM_ROLES_ENDPOINT \
                        --silent \
                        --insecure \
                        -H "Content-Type: $APPLICATION_CONTENT_TYPE" \
                        -H "Authorization: Bearer $TOKEN"`

    log_info "Keycloak realm roles fetched successfully."
}

function assign_realm_roles_to_users() {
    log_info "Starting to assign realm roles to created users..."

    get_users_response
    get_roles_response

    for (( i=0; i  < ${#USERNAMES[@]}; ++i )); do
        local USER_ID=`echo $USERS_RESPONSE | \
                        jq '.[] | select(.username=="'${USERNAMES[i]}'")' | grep id | awk '{print $2}' | tr -d '",'`

        local ROLE_ID=`echo $REALM_ROLES_RESPONSE | \
                        jq '.[] | select(.name=="'${ROLES_NAMES[i]}'")' | grep id | awk '{print $2}' | tr -d '",'`

        curl "$MINIKUBE_URL/auth/admin/realms/$MASTER_REALM/users/$USER_ID/role-mappings/realm" \
                --silent \
                --insecure \
                -H "Content-Type: $APPLICATION_CONTENT_TYPE" \
                -H "Authorization: Bearer $TOKEN" \
                --data '[{
                            "id": "'$ROLE_ID'",
                            "name": "'${ROLES_NAMES[i]}'"
                        }]'
    done

    log_info "Assigned realm roles to created users successfully."
}

function main() {
    log_info "Starting DocWIRE (DEV) initialization script..."

    request_for_admin_token
    create_users
    assign_realm_roles_to_users
    save_users_into_mongo_db

    log_info "DocWIRE (DEV) initialization finished successfully."
}

main
