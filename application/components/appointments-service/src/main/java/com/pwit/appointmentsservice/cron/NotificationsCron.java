package com.pwit.appointmentsservice.cron;

import com.pwit.appointmentsservice.dto.Appointment;
import com.pwit.appointmentsservice.feign.notifications.NotificationsService;
import com.pwit.appointmentsservice.repository.AppointmentRepository;
import com.pwit.common.notifications.NotificationRequest;
import com.pwit.common.notifications.NotificationType;
import com.pwit.common.utils.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@EnableScheduling
@EnableAsync
@RequiredArgsConstructor
public class NotificationsCron {
    private static final Logger LOGGER = new Logger();
    private static final long MINUTES_TO_SEND_REMINDER = 15;

    private final AppointmentRepository appointmentRepository;
    private final NotificationsService notificationsService;

    @Async
    @Scheduled(cron = "0 0/15 * * * ?")
    public void scheduleAppointmentsReminder() {
        List<Appointment> appointments = appointmentRepository.findAll();

        for(Appointment appointment : appointments) {
            LocalDateTime timeNow = LocalDateTime.now();
            long minutesDifference = appointment.getAppointmentDate().until(timeNow, ChronoUnit.MINUTES);

            if(minutesDifference >= 0 && minutesDifference <= MINUTES_TO_SEND_REMINDER) {
                createNotificationRequestAndSend(appointment.getPatientId(), NotificationType.APPOINTMENT_REMINDER);
                createNotificationRequestAndSend(appointment.getDoctorId(), NotificationType.APPOINTMENT_REMINDER);

                LOGGER.info("Sent reminders to users associated to appointment with id {}.", appointment.getId());
            }
        }
    }

    @Async
    @Scheduled(cron = "0 0/1 * * * ?")
    public void scheduleAppointmentsPaymentReminder() {
        List<Appointment> appointments = appointmentRepository.findAll();

        for(Appointment appointment : appointments) {
                createNotificationRequestAndSend(appointment.getPatientId(),
                        NotificationType.APPOINTMENT_PAYMENT_REMINDER);

                LOGGER.info("Sent reminders to users with id to pay for appointment with id {}.",
                        appointment.getId(),
                        appointment.getId());
        }
    }

    private void createNotificationRequestAndSend(String receiverId, NotificationType notificationType) {
        NotificationRequest notificationRequest = new NotificationRequest().toBuilder()
                .receiverId(receiverId)
                .notificationType(notificationType)
                .build();

        notificationsService.createNewNotification(notificationRequest);
    }
}
