package com.pwit.appointmentsservice.feign;

import org.springframework.http.ResponseEntity;

public class AccountServiceFallback implements AccountService {
    @Override
    public ResponseEntity<?> setInitialDiagnoseDone() {
        return ResponseEntity.ok("Fallback");
    }
}
