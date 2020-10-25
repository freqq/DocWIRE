package com.pwit.appointmentsservice.exception;

public class InvalidFilesException extends RuntimeException {
    public InvalidFilesException(String message) {
        super(message);
    }

    public InvalidFilesException(String message, Throwable cause) {
        super(message, cause);
    }
}