package com.pwit.paymentservice.feign.appointment;

import com.pwit.paymentservice.dto.response.RecentAppointment;
import org.springframework.http.ResponseEntity;

public class AppointmentsServiceFallback implements AppointmentsService {
    @Override
    public ResponseEntity<?> setAppointmentsStateToPaid(String appointmentId) {
        return ResponseEntity.ok("Fallback");
    }

    @Override
    public RecentAppointment getAppointmentDetails(String appointmentId) {
        return null;
    }
}
