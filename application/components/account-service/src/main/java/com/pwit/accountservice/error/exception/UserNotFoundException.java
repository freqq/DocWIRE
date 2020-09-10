package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends DomainException {
    public UserNotFoundException(){
        super(HttpStatus.NOT_FOUND, "User with that username not found.");
    }
}
