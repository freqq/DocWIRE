#!/bin/bash
MINIKUBE_CONTEXT="minikube"
APPS_NS=${1:-'medic-app'}

function waitForReadyPod () {
    POD=$1
    NAME_COLUMN=1
    READY_COLUMN=2
    STATE_COLUMN=3
    echo -ne "\nWaiting for pod ${APPS_NS}:$POD to initialize"

    while true;
    do
        pod_information=$(kubectl get pods -n ${APPS_NS} | grep $POD | grep -v -e Completed -e Terminating -e ContainerCreating -e Init -e Pending)
        pod_state=$(echo $pod_information | awk '{print $'$STATE_COLUMN'}')

        if [ "$pod_state" != "" ] ; then
            if [ "$pod_state" == "Running" ] ; then
                pod_status=$(echo $pod_information | awk '{print $'$READY_COLUMN'}')
                ready_replicas=${pod_status%/*}
                all_replicas=${pod_status#*/}

                if [ $ready_replicas == $all_replicas ] ; then
                    return
                fi
            else
                pod_name=$(echo $pod_information | awk '{print $'$NAME_COLUMN'}')
                echo -e "\nError: Cannot start the pod. Pod $pod_name state: $pod_state\n"
                exit 1
            fi
        fi

        sleep 2
        echo -n "."
    done
}

function waitForPodDelete() {
    POD=$1
    echo -ne "\nWaiting for pod ${APPS_NS}:$POD to be deleted\n"

    while true;
    do
        pod_information=$(kubectl get pods -n ${APPS_NS} | grep $POD)

        if [ "$pod_information" == "" ] ; then
            return
        fi

        sleep 2
        echo -n "."
    done
}

function waitForNamespaceDelete() {
    echo -ne "\nWaiting for namespace ${APPS_NS} to be deleted\n"

    while true;
    do
        namespace_information=$(kubectl get namespace | grep "${APPS_NS}")

        if [ "$namespace_information" == "" ] ; then
            return
        fi

        sleep 2
        echo -n "."
    done
}