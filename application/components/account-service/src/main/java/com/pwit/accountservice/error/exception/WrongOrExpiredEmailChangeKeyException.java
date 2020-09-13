package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class WrongOrExpiredEmailChangeKeyException extends DomainException {
    private static final long serialVersionUID = 1L;

    public WrongOrExpiredEmailChangeKeyException(String content){
        super(HttpStatus.FORBIDDEN, content);
    }
}