PROTOCOL="https"
MINIKUBE_IP=$(minikube ip)
APPLICATION_CONTENT_TYPE="application/json"

MINIKUBE_URL="$PROTOCOL://$MINIKUBE_IP"

# Services URLs
CREATE_USER_ENDPOINT="$MINIKUBE_URL/api/users/"

# Keycloak URLs
MASTER_REALM="master"
USERS_ENDPOINT="$MINIKUBE_URL/auth/admin/realms/$MASTER_REALM/users"
REALM_ROLES_ENDPOINT="$MINIKUBE_URL/auth/admin/realms/$MASTER_REALM/roles"
GET_TOKEN_ENDPOINT="$MINIKUBE_URL/auth/realms/$MASTER_REALM/protocol/openid-connect/token"
PARTIAL_IMPORT_ENDPOINT="$MINIKUBE_URL/auth/admin/realms/$MASTER_REALM/partialImport"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD="password"
PASSWORD="1qazZAQ!"

USERNAMES=(
    "test_patient_1"
    "test_patient_2"
    "test_doctor_1"
    "test_doctor_2"
)

EMAILS=(
    "patient1@mail.pl"
    "patient2@mail.pl"
    "doctor1@mail.pl"
    "doctor2@mail.pl"
)

ROLES_NAMES=(
    'role-patient'
    'role-patient'
    'role-doctor'
    'role-doctor'
)

FIRST_NAME="First"
LAST_NAMES=(
    "PATIENT1"
    "PATIENT2"
    "DOCTOR1"
    "DOCTOR2"
)
BIRTH_DATE="2017-05-14"
LANG_KEY="pl"
GENDER="MALE"
ACCOUNT_TYPES=(
    "PATIENT"
    "PATIENT"
    "DOCTOR"
    "DOCTOR"
)

# Doctor info
TITLE="mgr"
SPECIALIZATION="SPECIALIZATION"
PRICE="233"
ABOUT_ME="AboutMe!"

# Patient info
WEIGHT="200"
HEIGHT="200"
ADDRESS="address"
ZIP_CODE="23-232"
CITY="Warsaw"
COUNTRY="Poland"
INITIAL_DIAGNOSE_DONE="false"