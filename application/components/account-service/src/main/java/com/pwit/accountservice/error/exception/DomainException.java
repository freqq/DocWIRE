package com.pwit.accountservice.error.exception;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@ToString(callSuper = true)
public abstract class DomainException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    @Getter
    private final HttpStatus status;

    DomainException(HttpStatus status, String message){
        super(message);
        this.status = status;
    }

    DomainException(HttpStatus status, String message, Throwable cause){
        super(message, cause);
        this.status = status;
    }
}
