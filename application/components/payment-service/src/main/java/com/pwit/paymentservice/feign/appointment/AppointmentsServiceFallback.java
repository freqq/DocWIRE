package com.pwit.paymentservice.feign.appointment;

import org.springframework.http.ResponseEntity;

public class AppointmentsServiceFallback implements AppointmentsService {
    @Override
    public ResponseEntity<?> setAppointmentsStateToPaid(String appointmentId) {
        return ResponseEntity.ok("Fallback");
    }
}
