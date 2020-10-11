package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.dto.request.AppointmentRequest;
import org.springframework.http.ResponseEntity;

public interface AppointmentService {
    ResponseEntity<?> createAppointment(AppointmentRequest appointmentRequest, String currentUserId);
    ResponseEntity<?> getAppointmentDetails(String appointmentId);
}
