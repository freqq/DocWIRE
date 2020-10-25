package com.pwit.appointmentsservice.feign.account;

import com.pwit.appointmentsservice.dto.user.User;
import org.springframework.http.ResponseEntity;

public class AccountServiceFallback implements AccountService {
    @Override
    public ResponseEntity<?> setInitialDiagnoseDone() {
        return ResponseEntity.ok("Fallback");
    }

    @Override
    public User getDetailsOfUserWithGivenId(String userId) {
        return null;
    }
}
