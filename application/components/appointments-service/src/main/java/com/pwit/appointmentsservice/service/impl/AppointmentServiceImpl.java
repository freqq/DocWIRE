package com.pwit.appointmentsservice.service.impl;

import com.pwit.appointmentsservice.dto.Appointment;
import com.pwit.appointmentsservice.dto.request.AppointmentRequest;
import com.pwit.appointmentsservice.dto.response.RecentAppointment;
import com.pwit.appointmentsservice.feign.AccountService;
import com.pwit.appointmentsservice.repository.AppointmentRepository;
import com.pwit.appointmentsservice.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AccountService accountService;

    @Override
    public ResponseEntity<?> createAppointment(AppointmentRequest appointmentRequest, String currentUserId) {
        Appointment appointment = new Appointment().toBuilder()
                .appointmentDate(appointmentRequest.getAppointmentDate())
                .chosenSymptoms(appointmentRequest.getChosenSymptoms())
                .doctorId(appointmentRequest.getDoctorId())
                .patientId(appointmentRequest.getPatientId())
                .lastSurvey(appointmentRequest.getLastSurvey())
                .quickSurvey(appointmentRequest.getQuickSurvey())
                .lastSurvey(appointmentRequest.getLastSurvey())
                .visitedRegions(appointmentRequest.getVisitedRegions())
                .build();

        appointmentRepository.save(appointment);
        accountService.setInitialDiagnoseDone();

        return ResponseEntity.ok(appointment);
    }

    @Override
    public ResponseEntity<?> getAppointmentDetails(String appointmentId) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(appointment.isEmpty())
            return ResponseEntity.notFound().build();

        RecentAppointment recentAppointment = createRecentAppointment(appointment.get());

        return ResponseEntity.ok(recentAppointment);
    }

    @Override
    public ResponseEntity<?> getAllAppointmentsForCurrentUser(String currentUserId) {
        List<Appointment> appointments = appointmentRepository.findAllByPatientId(currentUserId);
        List<RecentAppointment> recentAppointments = new ArrayList<>();

        for(Appointment appointment : appointments) {
            RecentAppointment recentAppointment = createRecentAppointment(appointment);
            recentAppointments.add(recentAppointment);
        }

        return new ResponseEntity<>(recentAppointments, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getMostRecentAppointmentForCurrentUser(String currentUserId) {
        Appointment appointment = appointmentRepository.findTopByPatientId(currentUserId);
        RecentAppointment recentAppointment = createRecentAppointment(appointment);

        return new ResponseEntity<>(recentAppointment, HttpStatus.OK);
    }

    private RecentAppointment createRecentAppointment(Appointment appointment) {
        return new RecentAppointment().toBuilder()
                .appointmentDate(appointment.getAppointmentDate())
                .chosenSymptoms(appointment.getChosenSymptoms())
                .doctor(accountService.getDetailsOfUserWithGivenId(appointment.getDoctorId()))
                .patient(accountService.getDetailsOfUserWithGivenId(appointment.getPatientId()))
                .lastSurvey(appointment.getLastSurvey())
                .quickSurvey(appointment.getQuickSurvey())
                .visitedRegions(appointment.getVisitedRegions())
                .id(appointment.getId())
                .build();
    }
}
