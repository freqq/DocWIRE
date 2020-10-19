package com.pwit.appointmentsservice.service.impl;

import com.pwit.appointmentsservice.dto.Appointment;
import com.pwit.appointmentsservice.dto.enumeration.AppointmentState;
import com.pwit.appointmentsservice.dto.request.AppointmentRequest;
import com.pwit.appointmentsservice.dto.response.RecentAppointment;
import com.pwit.appointmentsservice.dto.user.User;
import com.pwit.appointmentsservice.feign.AccountService;
import com.pwit.appointmentsservice.repository.AppointmentRepository;
import com.pwit.appointmentsservice.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
                .appointmentState(AppointmentState.REQUESTED)
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
    @Override
    public ResponseEntity<?> acceptAppointmentRequest(String appointmentId) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(appointment.isEmpty())
            return new ResponseEntity<>("Appointment with given id not found.", HttpStatus.NOT_FOUND);

        appointment.get().setAppointmentState(AppointmentState.ACCEPTED);
        appointmentRepository.save(appointment.get());
        RecentAppointment recentAppointment = createRecentAppointment(appointment.get());

        return new ResponseEntity<>(recentAppointment, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> setAppointmentsStateToPaid(String appointmentId) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(appointment.isEmpty())
            return new ResponseEntity<>("Appointment with given id not found.", HttpStatus.NOT_FOUND);

        appointment.get().setAppointmentState(AppointmentState.PAID);
        appointmentRepository.save(appointment.get());
        RecentAppointment recentAppointment = createRecentAppointment(appointment.get());

        return new ResponseEntity<>(recentAppointment, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAppointmentsRequests(String currentUserId) {
        List<Appointment> appointments = appointmentRepository.findAllByDoctorId(currentUserId);
        List<RecentAppointment> recentAppointments = new ArrayList<>();

        for(Appointment appointment : appointments) {
            if(appointment.getAppointmentState() == AppointmentState.REQUESTED) {
                RecentAppointment recentAppointment = createRecentAppointment(appointment);
                recentAppointments.add(recentAppointment);
            }
        }

        return new ResponseEntity<>(recentAppointments, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAcceptedAppointments(String date,
                                                     String currentUserId) {
        List<Appointment> appointments = appointmentRepository.findAllByDoctorId(currentUserId);
        List<RecentAppointment> recentAppointments = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime requestDay = LocalDateTime.parse(date, formatter);

        for(Appointment appointment : appointments) {
            if(appointment.getAppointmentState() != AppointmentState.REQUESTED
                && areDatesWithoutTimeEqual(appointment.getAppointmentDate(), requestDay)) {
                RecentAppointment recentAppointment = createRecentAppointment(appointment);
                recentAppointments.add(recentAppointment);
            }
        }

        return new ResponseEntity<>(recentAppointments, HttpStatus.OK);
    }

    private boolean areDatesWithoutTimeEqual(LocalDateTime dateOne, LocalDateTime dateTwo) {
        return dateOne.getMonth() == dateTwo.getMonth()
                && dateOne.getDayOfMonth() == dateTwo.getDayOfMonth()
                && dateOne.getYear() == dateTwo.getYear();
    }

    private RecentAppointment createRecentAppointment(Appointment appointment) {
        User doctor = accountService.getDetailsOfUserWithGivenId(appointment.getDoctorId());

        return new RecentAppointment().toBuilder()
                .appointmentDate(appointment.getAppointmentDate())
                .chosenSymptoms(appointment.getChosenSymptoms())
                .doctor(doctor)
                .patient(accountService.getDetailsOfUserWithGivenId(appointment.getPatientId()))
                .lastSurvey(appointment.getLastSurvey())
                .quickSurvey(appointment.getQuickSurvey())
                .appointmentPrice(doctor.getDoctorInfo().getPrice())
                .appointmentState(appointment.getAppointmentState())
                .visitedRegions(appointment.getVisitedRegions())
                .id(appointment.getId())
                .build();
    }
}
