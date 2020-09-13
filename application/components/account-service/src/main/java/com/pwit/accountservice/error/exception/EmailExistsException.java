package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class EmailExistsException extends DomainException {
    private static final long serialVersionUID = 1L;

    public EmailExistsException(){
        super(HttpStatus.FORBIDDEN, "Email already exists.");
    }
}
