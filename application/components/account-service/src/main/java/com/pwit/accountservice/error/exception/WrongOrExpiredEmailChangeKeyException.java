package com.pwit.accountservice.error.exception;

import org.springframework.http.HttpStatus;

public class WrongOrExpiredEmailChangeKeyException extends DomainException {
    public WrongOrExpiredEmailChangeKeyException(String content){
        super(HttpStatus.FORBIDDEN, content);
    }
}