package com.pwit.paymentsservice.feign;

import org.springframework.http.ResponseEntity;

public class AppointmentsServiceFallback implements AppointmentsService {
    @Override
    public ResponseEntity<?> setAppointmentsStateToPaid(String appointmentId) {
        return ResponseEntity.ok("Fallback");
    }
}
