package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class PasswordResetKeyWrongOrExpiredException extends DomainException {
    private static final long serialVersionUID = 1L;

    public PasswordResetKeyWrongOrExpiredException(String content){
        super(HttpStatus.FORBIDDEN, content);
    }
}