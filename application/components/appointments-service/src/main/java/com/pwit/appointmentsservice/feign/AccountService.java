package com.pwit.appointmentsservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(
    name = "account-service-svc",
    url = "https://account-service-svc:8445",
    configuration = FeignConfiguration.class,
    fallback = AccountServiceFallback.class
)
public interface AccountService {
    @PutMapping("/api/users/diagnose")
    ResponseEntity<?> setInitialDiagnoseDone();
}
