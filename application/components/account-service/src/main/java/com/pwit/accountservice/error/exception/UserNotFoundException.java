package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends DomainException {
    private static final long serialVersionUID = 1L;

    public UserNotFoundException(){
        super(HttpStatus.NOT_FOUND, "User with that username not found.");
    }
}
