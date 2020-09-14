package com.pwit.accountservice.security;

import lombok.RequiredArgsConstructor;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UsersResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.net.ssl.SSLContext;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

@RequiredArgsConstructor
@Configuration
public class KeycloakAdminAPIConfiguration {
    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.resource}")
    private String clientId;

    @Value("${keycloak.auth-server-url}")
    private String url;

    @Value("${keycloak-admin.client-secret}")
    private String clientSecret;

    @Value("${keycloak-admin.username}")
    private String adminUsername;

    @Value("${keycloak-admin.password}")
    private String adminPassword;

    private SSLContext sslContext() throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        return  new SSLContextBuilder().loadTrustMaterial(null, (TrustStrategy) (arg0, arg1) -> true).build();
    }

    private ResteasyClient client() throws NoSuchAlgorithmException, KeyStoreException, KeyManagementException {
        return new ResteasyClientBuilder()
                .sslContext(sslContext())
                .hostnameVerification(ResteasyClientBuilder.HostnameVerificationPolicy.ANY)
                .connectionPoolSize(10)
                .build();
    }

    @Bean
    Keycloak keycloak() throws NoSuchAlgorithmException, KeyStoreException, KeyManagementException {
        return KeycloakBuilder.builder()
                .serverUrl(url)
                .realm(realm)
                .grantType(OAuth2Constants.PASSWORD)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .username(adminUsername)
                .password(adminPassword)
                .resteasyClient(client())
                .build();
    }

    @Bean
    UsersResource usersResource(Keycloak keycloak) {
        return keycloak.realm(realm).users();
    }
}
