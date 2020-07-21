package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class EmailExistsException extends DomainException {
    public EmailExistsException(){
        super(HttpStatus.FORBIDDEN, "Email already exists.");
    }
}
