package com.pwit.accountservice.security;

public final class Authorities {
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_USER";
    public static final String ROLE_PATIENT = "ROLE_PATIENT";
    public static final String ROLE_DOCTOR = "ROLE_DOCTOR";

    private Authorities() {
        throw new IllegalStateException("Utility class");
    }
}
