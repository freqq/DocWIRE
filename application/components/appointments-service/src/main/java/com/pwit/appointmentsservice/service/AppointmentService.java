package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.dto.request.AppointmentRequest;
import org.springframework.http.ResponseEntity;

public interface AppointmentService {
    ResponseEntity<?> createAppointment(AppointmentRequest appointmentRequest, String currentUserId);
    ResponseEntity<?> getAppointmentDetails(String appointmentId);
    ResponseEntity<?> getAllAppointmentsForCurrentUser(String currentUserId);
    ResponseEntity<?> getMostRecentAppointmentForCurrentUser(String currentUserId);
    ResponseEntity<?> acceptAppointmentRequest(String appointmentId);
    ResponseEntity<?> setAppointmentsStateToPaid(String appointmentId);
    ResponseEntity<?> getAppointmentsRequests(String currentUserId);
    ResponseEntity<?> getAcceptedAppointments(String date, String currentUserId);
}
