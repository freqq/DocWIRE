package com.pwit.accountservice.security;

public final class Authorities {
    public static final String ROLE_USER = "ROLE_role-user";
    public static final String ROLE_ADMIN = "ROLE_role-admin";
    public static final String ROLE_PATIENT = "ROLE_role-patient";
    public static final String ROLE_DOCTOR = "ROLE_role-doctor";

    private Authorities() {
        throw new IllegalStateException("Utility class");
    }
}
