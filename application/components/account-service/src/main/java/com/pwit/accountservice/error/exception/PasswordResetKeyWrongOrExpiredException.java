package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class PasswordResetKeyWrongOrExpiredException extends DomainException {
    public PasswordResetKeyWrongOrExpiredException(String content){
        super(HttpStatus.FORBIDDEN, content);
    }
}