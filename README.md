# DocWIRE - Online Doctor Video Consulting 

Web application used to consult a family doctor using online videoconferences in microservices architecture.

### Tech stack:

Technologies:
- Java 11
- JavaScript
- Python 3

Frameworks:
- Spring Boot 2.3 
- React + Redux
- Selenium

3rd party:
- OpenVidu
- Keycloak
- RabbitMQ

Databases:
- PostgreSQL
- MongoDB

Building:
- Yarn
- Node
- Gradle

DevOps:
- Docker
- Helm
- Kubernetes
- Ansible

### Functional services
- *account-service* - handle user details
- *appointments-service* - appointments CRUD and vide call service (**OpenVidu** wrapper)
- *auth-service* - authentication service (**Keycloak** wrapper)
- *frontend* - user interface
- *messages-service* - user messages connected with RabbitMQ
- *notifications-service* - user notifications
- *payment-service* - service to handle payments

### Utils services
- *Grafana* - multi-platform open source analytics and interactive visualization web application
- *Prometheus* - software application used for event monitoring and alerting
- *rabbit-mq* - queue for *messages-service* and *messages-service*

### Prerequisites
In order to run this application you need to install:

- minikube >1.6.2
- kubectl >1.17.0
- Node >12.18.2
- yarn >1.22.4
- Gradle >6.5.1
- Helm >3.1.1

### Starting local *minikube* Kuberentes cluster
In order to run application in development profile, first you need to mount *frontend* component files to **Kubernetes cluster** with command below:

```sh
$ minikube mount application/components/frontend:/frontend/src
```

Then in another terminal window execute:

```sh
$ cd scripts && ./start.sh
```

You can reach a website at URL logged at the end of start script.

## Starting monitoring services

In order to run application in development profile execute:

```sh
$ cd scripts && ./run_monitoring_tools.sh
```

You can reach Grafana and Prometheus at URLs logged at the end of start script.

## Starting selenium E2E tests

In order to be able to run E2E tests, first you need to configure your environment with command below:

```sh
$ cd scripts && ./configure_e2e_requirements.sh
```

Then you can run script with given parameters:

| Parameter      | Description |
| -------------- | ------------- |
| --due-to       | Sets period of tests execution. [s, m, h, d]  |
| --test-filter  | Filter tests to run |
| --test-exclude | Tests to skip |
| --stop-on-fail | Stop tests execution after first failed test |
| --browser      | Browser to tests |
| --seed         | Seed used to shuffle tests |

To run script run command below with chosen parameters:

```sh
$ cd scripts && ./run_e2e_tests.sh
```
