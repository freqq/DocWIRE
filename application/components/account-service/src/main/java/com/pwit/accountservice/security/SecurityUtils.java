package com.pwit.accountservice.security;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.representations.AccessToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Set;
import java.util.stream.Collectors;

public class SecurityUtils {
    public static String getCurrentUserEmail() {
        return getKeycloakPrincipal().getEmail();
    }

    public static String getCurrentUserId() {
        return getKeycloakPrincipal().getSubject();
    }

    public static String getCurrentUsername() {
        return getKeycloakPrincipal().getPreferredUsername();
    }

    public boolean isCurrentUserInRole(String role) {
        return getRoles()
                .stream()
                .map(String::toLowerCase)
                .collect(Collectors.toList())
                .contains(
                        // Role here in collection looks exactly like in Keycloak service
                        // they are not mapped to Springs 'ROLE_' convention
                        role
                            .replace("ROLE_", "")
                            .toLowerCase()
                );
    }

    private Set<String> getRoles() {
        return getKeycloakPrincipal().getRealmAccess().getRoles();
    }

    private static AccessToken getKeycloakPrincipal() {
        KeycloakPrincipal<?> kcPrincipal = getPrincipal();
        return kcPrincipal.getKeycloakSecurityContext().getToken();
    }

    private static KeycloakPrincipal<?> getPrincipal() {
        return (KeycloakPrincipal<?>) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
