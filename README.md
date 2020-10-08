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
- *auth-service* - authentication service (**Keycloak** wrapper)
- *notifications-service* - user notifications
- *appointments-service* - appointments CRUD and vide call service (**OpenVidu** wrapper)
- *messages-service* - user messages connected with RabbitMQ
- *payment-service* - service to handle payments
- *frontend* - user interface

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
In order to run application in development profile execute:

```sh
$ cd scripts && ./start.sh
```

You can reach a website at URL logged at the end of start script.
