package com.pwit.accountservice.error;

import com.pwit.accountservice.error.exception.DomainException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Slf4j
@Component
class DomainExceptionWrapper extends DefaultErrorAttributes {

    DomainExceptionWrapper() {
        super(false);
    }

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest request, boolean includeStackTrace) {
        final var error = getError(request);
        final var errorAttributes = super.getErrorAttributes(request, false);

        if (error instanceof DomainException) {
            log.debug("Caught an instance of: {}, err: {}", DomainException.class, error);
            final var errorStatus = ((DomainException) error).getStatus();
            errorAttributes.replace(ErrorAttribute.STATUS.value, errorStatus.value());
            errorAttributes.replace(ErrorAttribute.ERROR.value, errorStatus.getReasonPhrase());

            request.setAttribute("javax.servlet.error.status_code", ((DomainException) error).getStatus(),0);
        }

        return errorAttributes;
    }

    enum ErrorAttribute {
        STATUS("status"),
        ERROR("error");

        private final String value;

        ErrorAttribute(String value) {
            this.value = value;
        }
    }

}

