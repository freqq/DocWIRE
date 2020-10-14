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
     *
     */
    @Secured(ROLE_USER)
    @GetMapping("/details/recent")
    public ResponseEntity<?> getMostRecentAppointmentForCurrentUser() {
        LOGGER.info("Fetching most recent appointment for user {}.", getCurrentUsername());
        return appointmentService.getMostRecentAppointmentForCurrentUser(getCurrentUserId());
    }
}
