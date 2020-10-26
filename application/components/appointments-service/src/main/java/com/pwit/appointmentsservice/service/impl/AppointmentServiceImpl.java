package com.pwit.appointmentsservice.service.impl;

import com.pwit.appointmentsservice.dto.Appointment;
import com.pwit.appointmentsservice.dto.File;
import com.pwit.appointmentsservice.dto.Review;
import com.pwit.appointmentsservice.dto.enumeration.AppointmentState;
import com.pwit.appointmentsservice.dto.request.AppointmentRequest;
import com.pwit.appointmentsservice.dto.request.ReviewRequest;
import com.pwit.appointmentsservice.dto.response.FileResponse;
import com.pwit.appointmentsservice.dto.response.RecentAppointment;
import com.pwit.appointmentsservice.dto.response.RecentAppointmentShort;
import com.pwit.appointmentsservice.dto.user.User;
import com.pwit.appointmentsservice.feign.account.AccountService;
import com.pwit.appointmentsservice.feign.notifications.NotificationsService;
import com.pwit.appointmentsservice.repository.AppointmentRepository;
import com.pwit.appointmentsservice.repository.FilesRepository;
import com.pwit.appointmentsservice.repository.ReviewRepository;
import com.pwit.appointmentsservice.service.AppointmentService;
import com.pwit.common.notifications.NotificationRequest;
import com.pwit.common.notifications.NotificationType;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
    private final ReviewRepository reviewRepository;
    private final NotificationsService notificationsService;
    private final FilesRepository filesRepository;

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
        createAndSendNotificationRequest(NotificationType.APPOINTMENT_CREATED, appointment.getDoctorId(), appointment.getId());

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
    public ResponseEntity<?> getAllAppointmentsForCurrentUserShort(String currentUserId) {
        List<Appointment> appointments = appointmentRepository.findAllByPatientId(currentUserId);
        List<RecentAppointmentShort> recentAppointments = new ArrayList<>();

        for(Appointment appointment : appointments) {
            RecentAppointmentShort recentAppointmentShort = createRecentAppointmentShort(appointment);
            recentAppointments.add(recentAppointmentShort);
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
        createAndSendNotificationRequest(NotificationType.APPOINTMENT_ACCEPTED,
                appointment.get().getPatientId(),
                appointment.get().getId());

        return new ResponseEntity<>(recentAppointment, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> setAppointmentsStateToPaid(String appointmentId) {
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);

        if(appointment.isEmpty())
            return new ResponseEntity<>("Appointment with given id not found.", HttpStatus.NOT_FOUND);

        appointment.get().setAppointmentState(AppointmentState.PAID);
        appointmentRepository.save(appointment.get());
        createAndSendNotificationRequest(NotificationType.APPOINTMENT_PAID,
                appointment.get().getDoctorId(),
                appointment.get().getId());

        return ResponseEntity.ok().build();
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
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

    @Override
    public ResponseEntity<?> reviewDoctorAfterAppointment(ReviewRequest reviewRequest) {
        Optional<Appointment> appointment = appointmentRepository.findById(reviewRequest.getAppointmentId());

        if(appointment.isEmpty())
            return new ResponseEntity<>("Appointment with given id not found.", HttpStatus.NOT_FOUND);

        Review review = new Review().toBuilder()
                .appointmentId(reviewRequest.getAppointmentId())
                .doctorId(reviewRequest.getDoctorId())
                .patientId(reviewRequest.getPatientId())
                .rating(reviewRequest.getRating())
                .ratingDate(Instant.now())
                .build();

        reviewRepository.save(review);

        appointment.get().setAppointmentState(AppointmentState.REVIEWED);
        appointmentRepository.save(appointment.get());
        createAndSendNotificationRequest(NotificationType.APPOINTMENT_REVIEWED,
                appointment.get().getDoctorId(),
                appointment.get().getId());

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);

        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAllReviewsForCurrentUser(String userId, String currentUserId) {
        return ResponseEntity.ok(reviewRepository.findAllByDoctorId(userId));
    }

    private boolean areDatesWithoutTimeEqual(LocalDateTime dateOne, LocalDateTime dateTwo) {
        return dateOne.getMonth() == dateTwo.getMonth()
                && dateOne.getDayOfMonth() == dateTwo.getDayOfMonth()
                && dateOne.getYear() == dateTwo.getYear();
    }

    private RecentAppointment createRecentAppointment(Appointment appointment) {
        User doctor = accountService.getDetailsOfUserWithGivenId(appointment.getDoctorId());
        List<File> files = filesRepository.findAllByAppointmentId(appointment.getId());
        List<FileResponse> fileResponses = mapFilesToFilesResponses(files);

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
                .listOfFiles(fileResponses)
                .build();
    }

    private List<FileResponse> mapFilesToFilesResponses(List<File> files) {
        List<FileResponse> listOfFiles = new ArrayList<>();

        for(File file : files) {
            FileResponse fileResponse = new FileResponse().toBuilder()
                    .id(file.getId())
                    .name(file.getName())
                    .build();

            listOfFiles.add(fileResponse);
        }

        return listOfFiles;
    }

    private void createAndSendNotificationRequest(NotificationType notificationType, String receiverId, String appointmentId) {
        NotificationRequest notificationRequest = new NotificationRequest().toBuilder()
                .notificationType(notificationType)
                .receiverId(receiverId)
                .appointmentId(appointmentId)
                .build();

        notificationsService.createNewNotification(notificationRequest);
    }

    private RecentAppointmentShort createRecentAppointmentShort(Appointment appointment) {

        return new RecentAppointmentShort().toBuilder()
                .appointmentDate(appointment.getAppointmentDate())
                .doctorId(appointment.getDoctorId())
                .patientId(appointment.getPatientId())
                .appointmentState(appointment.getAppointmentState())
                .id(appointment.getId())
                .build();
    }
}
