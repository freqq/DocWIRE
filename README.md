# DocWIRE - Online Doctor Video Consulting 

Web application used to consult a family doctor using online videoconferences in microservices architecture.

### Tech stack

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

### Main features
- live video call and live chat with doctor
- private messages user to user
- live notifications
- payment integration with *Stripe*
- diagnose process page

### Infrastructure diagram

![Diagram](screenshots/architecture.png?raw=true "Diagram")

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

### Application screenshots

- Main landing page

![Main landing page](screenshots/app/main_page.png?raw=true "Main landing page")

- Login page

![Login page](screenshots/app/login.png?raw=true "Login page")

- Initial diagnose page
  - Introduction

  ![Introduction](screenshots/app/diagnose_introduction.png?raw=true "Introduction")

  - Symptoms

  ![Symptoms](screenshots/app/diagnose_symptoms.png?raw=true "Symptoms")

  - Visited regions

  ![Visited regions](screenshots/app/diagnose_visited_regions.png?raw=true "Visited regions")

  - Choose doctor

  ![Choose doctor](screenshots/app/diagnose_chose_doctor.png?raw=true "Choose doctor")

  - Pick appointment date

  ![Pick appointment date](screenshots/app/diagnose_pick_date.png?raw=true "Pick appointment date")

- Dashboard page

![Dashboard page](screenshots/app/dashboard.png?raw=true "Dashboard page")

- Messages page

![Messages page](screenshots/app/messages.png?raw=true "Messages page")

- Patient details page

![Patient details page](screenshots/app/patient_details.png?raw=true "Patient details page")

- Appointment details page

![Appointment details page](screenshots/app/appointment_details.png?raw=true "Appointment details page")

- Appointments list page
  - Doctor view

  ![Doctor view](screenshots/app/appointments_list_doctor.png?raw=true "Doctor view")

  - Patient view

  ![Patient view](screenshots/app/appointments_list_patient.png?raw=true "Patient view")

- Profile settings page

![Profile settings page](screenshots/app/user_settings.png?raw=true "Profile settings page")

- Notifications

![Notifications](screenshots/app/notifications.png?raw=true "Notifications")

- Video talk page
  - Configuration

  ![Video talk page - Configuration](screenshots/app/video_configuration.png?raw=true "Video talk page - Configuration")

  - Connected

  ![Video talk page - Connected](screenshots/app/video_talk.png?raw=true "Video talk page - Connected")

### Prerequisites
In order to run this application you need to have installed:

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
In order to run application in development profile, first you need to create *minikube* cluster:

```sh
$ minikube start --cpus=4 --memory=8192
```

Then you need to mount *frontend* component files to **Kubernetes cluster** with command below:

```sh
$ minikube mount application/components/frontend:/frontend/src
```

Then in another terminal window execute:

```sh
$ cd scripts && ./start.sh
```

<details>
  <summary>Example output</summary>

    123

</details>

You can reach a website at URL logged at the end of start script.


## Payments

In order to checkout payments in development environment execute command:

```sh
$ stripe listen --api-key sk_test_51HdE8mDV6EZPJrHHkftff05Uwa2RNhDQLmnzUbPHuTb4PfYJShQ2OoQHFyPyIWCe3mwL46DM7XECaO68BqDO4GaD001VY2kjNY --load-from-webhooks-api --forward-to https://<MINIKUBE_IP>:32004 --skip-verify
```

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
