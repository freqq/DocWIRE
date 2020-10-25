package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.dto.request.AppointmentRequest;
import com.pwit.appointmentsservice.dto.request.ReviewRequest;
import org.springframework.http.ResponseEntity;

public interface AppointmentService {
    ResponseEntity<?> createAppointment(AppointmentRequest appointmentRequest, String currentUserId);
    ResponseEntity<?> getAppointmentDetails(String appointmentId);
    ResponseEntity<?> getAllAppointmentsForCurrentUser(String currentUserId);
    ResponseEntity<?> getAllAppointmentsForCurrentUserShort(String currentUserId);
    ResponseEntity<?> getMostRecentAppointmentForCurrentUser(String currentUserId);
    ResponseEntity<?> acceptAppointmentRequest(String appointmentId);
    ResponseEntity<?> setAppointmentsStateToPaid(String appointmentId);
    ResponseEntity<?> reviewDoctorAfterAppointment(ReviewRequest reviewRequest);
    ResponseEntity<?> getAppointmentsRequests(String currentUserId);
    ResponseEntity<?> getAcceptedAppointments(String date, String currentUserId);
    ResponseEntity<?> getAllReviewsForCurrentUser(String userId, String currentUserId);
}
