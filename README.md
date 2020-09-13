# DocWIRE - Online Doctor Video Consulting 

Web application used to consult a family doctor using online videoconferences in microservices architecture.

### Tech stack:

- Kubernetes
- Spring Boot
- React + Redux
- RabbitMQ
- Java
- JavaScript
- Docker
- OpenVidu
- Keycloak

### Functional services
- *account-service* (**8080**) - handle user details
- *auth-service* (**8081**) - authentication service
- *notifications-service* (**8082**)- user notifications
- *appointments-service* (**8083**) - appointments CRUD
- *video-conversation-service* (**8084**) - **OpenVidu** wrapper
- *messages-service* (**8085**) - user messages
- *payment-service* (**8086**)- service to handle payments
- *frontend* (**9040**)- user interface

### Utils services
- *Grafana* (**9080**) - multi-platform open source analytics and interactive visualization web application
- *Prometheus* (**9081**) - software application used for event monitoring and alerting
- *rabbit-mq* (**5672**) - queue for *messages-service* and *messages-service*

### Prerequisites
In order to install needed packages you need to execute script to add an entry in /etc/hosts file.

```sh
$ cd scripts && ./configure_linux.sh
```

### Starting local docker compose
In order to run application in development profile execute:

```sh
$ cd scripts && ./start_docker_compose.sh
```

You can reach a website on http://docwire.test:9040
