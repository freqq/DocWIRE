# DocWIRE - Online Doctor Video Consulting 

Web application used to consult a family doctor using online videoconferences in microservices architecture.

### Tech stack:

Technologies:
- Java 11
- JavaScript
- Python 3.6

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
- Ansible (?)

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
- *sonarqube* - static code analysis

### Prerequisites
In order to run this application you need to install:

- minikube > v1.6.2
- kubectl > v1.17.0
- Node > v12.18.2
- Docker > v19.03.5
- python > v3.6
- yarn > v1.22.4
- Gradle > v6.5.1
- Helm > v3.1.1
- mkcert > v1.4.1
- openssl > v2.8.3
- sonar-scanner > v4.5.0

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
$ cd scripts/e2e && ./configure_e2e_requirements.sh
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
$ cd scripts/e2e && ./run_e2e_tests.sh
```

## Analyzing sonarqube analysis

In order to deploy *sonarqube* on run command below:

```sh
$ cd scripts/sonar && ./start_sonar.sh
```

It creates two pods with sonarqube and its database - PostreSQL. To analyze the code run command: 

```sh
$ cd scripts/sonar && ./run_sonnar_scanner.sh
```

This command analyze **application/components** directory and sends data to *sonarqube* available at URL printed on the end of start script.