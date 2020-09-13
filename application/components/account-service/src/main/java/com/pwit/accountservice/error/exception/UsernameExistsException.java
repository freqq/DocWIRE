package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class UsernameExistsException extends DomainException {
    private static final long serialVersionUID = 1L;

    public UsernameExistsException(){
        super(HttpStatus.FORBIDDEN, "Username already exists.");
    }
}
