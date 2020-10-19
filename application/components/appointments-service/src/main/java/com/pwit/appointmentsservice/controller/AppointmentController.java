package com.pwit.appointmentsservice.controller;

import com.pwit.appointmentsservice.dto.request.AppointmentRequest;
import com.pwit.appointmentsservice.service.AppointmentService;
import com.pwit.common.utils.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.pwit.common.security.Authorities.ROLE_USER;
import static com.pwit.common.security.SecurityUtils.getCurrentUserId;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private static final Logger LOGGER = new Logger();

    private final AppointmentService appointmentService;

    /**
     * Fetches details of given appointment.
     *
     * @param appointmentId  Id of appointment to get
     */
    @Secured(ROLE_USER)
    @GetMapping("/{appointmentId}")
    public ResponseEntity<?> getAppointmentDetails(@PathVariable("appointmentId") String appointmentId) {
        LOGGER.info("Getting details of an appointment for user {}.", getCurrentUsername());
        return appointmentService.getAppointmentDetails(appointmentId);
    }

    /**
     * Creates a new appointment with given data.
     *
     * @param appointmentRequest   Model of a new appointment
     */
    @Secured(ROLE_USER)
    @PostMapping("/")
    public ResponseEntity<?> createAppointment(@RequestBody @Valid AppointmentRequest appointmentRequest) {
        LOGGER.info("Creating an appointment for user {}.", getCurrentUsername());
        return appointmentService.createAppointment(appointmentRequest, getCurrentUserId());
    }

    /**
     * Fetches all appointments for current user.
     *
     */
    @Secured(ROLE_USER)
    @GetMapping("/details/all")
    public ResponseEntity<?> getAllAppointmentsForCurrentUser() {
        LOGGER.info("Fetching all appointments for user {}.", getCurrentUsername());
        return appointmentService.getAllAppointmentsForCurrentUser(getCurrentUserId());
    }

    /**
     * Fetches most recent appointment for current user.
     */
    @Secured(ROLE_USER)
    @GetMapping("/details/recent")
    public ResponseEntity<?> getMostRecentAppointmentForCurrentUser() {
        LOGGER.info("Fetching most recent appointment for user {}.", getCurrentUsername());
        return appointmentService.getMostRecentAppointmentForCurrentUser(getCurrentUserId());
    }

    /**
     * Accepting an appointment request by doctor.
     *
     * @param appointmentId   Id of an appointment
     */
    @PutMapping("/accept/{appointmentId}")
    public ResponseEntity<?> acceptAppointmentRequest(@PathVariable("appointmentId") String appointmentId) {
        LOGGER.info("Accepting an appointment request by doctor for user {}.", getCurrentUsername());
        return appointmentService.acceptAppointmentRequest(appointmentId);
    }

    /**
     * Setting an appointment state to paid.
     *
     * @param appointmentId   Id of an appointment
     */
    @PutMapping("/paid/{appointmentId}")
    public ResponseEntity<?> setAppointmentsStateToPaid(@PathVariable("appointmentId") String appointmentId) {
        LOGGER.info("Setting an appointment state to paid by patient with username '{}'.", getCurrentUsername());
        return appointmentService.setAppointmentsStateToPaid(appointmentId);
    }

    /**
     * Getting all requests for current doctor.
     */
    @GetMapping("/requests")
    public ResponseEntity<?> getAppointmentsRequests() {
        LOGGER.info("Getting an appointment requests for doctor with username '{}'.", getCurrentUsername());
        return appointmentService.getAppointmentsRequests(getCurrentUserId());
    }

    /**
     * Getting all accepted requests for current doctor.
     */
    @GetMapping("/accepted")
    public ResponseEntity<?> getAcceptedAppointments(@RequestParam(value = "date") String date) {
        LOGGER.info("Getting accepted appointments for doctor with username '{}'.", getCurrentUsername());
        return appointmentService.getAcceptedAppointments(date, getCurrentUserId());
    }
}
