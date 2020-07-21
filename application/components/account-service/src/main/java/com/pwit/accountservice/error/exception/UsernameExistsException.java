package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class UsernameExistsException extends DomainException {
    public UsernameExistsException(){
        super(HttpStatus.FORBIDDEN, "Username already exists.");
    }
}
