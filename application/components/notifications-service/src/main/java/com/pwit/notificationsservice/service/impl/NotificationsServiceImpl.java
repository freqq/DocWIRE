package com.pwit.notificationsservice.service.impl;

import com.pwit.common.utils.Logger;
import com.pwit.notificationsservice.dto.Notification;
import com.pwit.common.notifications.NotificationType;
import com.pwit.notificationsservice.dto.request.NotificationRequest;
import com.pwit.notificationsservice.dto.response.NotificationResponse;
import com.pwit.notificationsservice.feign.UserService;
import com.pwit.notificationsservice.repository.NotificationRepository;
import com.pwit.notificationsservice.service.NotificationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationsServiceImpl implements NotificationsService {
    private static final Logger LOGGER = new Logger();

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserService userService;

    @Override
    public ResponseEntity<?> getNotificationsList(String currentUserId) {
        List<Notification> notificationList =
                notificationRepository.findAllByIdNotNullAndReceiverIdEqualsOrderByDateTimeDesc(currentUserId);
        List<NotificationResponse> notificationResponseList = new ArrayList<>();

        for(Notification notification : notificationList) {
            NotificationResponse notificationResponse = new NotificationResponse().toBuilder()
                    .notificationDate(notification.getDateTime())
                    .author(userService.getDetailsOfUserWithGivenId(notification.getAuthorId()))
                    .content(createNotificationContent(notification.getNotificationType()))
                    .read(notification.isRead())
                    .build();

            notificationResponseList.add(notificationResponse);
        }

        return ResponseEntity.ok(notificationResponseList);
    }

    @Override
    public Boolean checkIfAnyNewNotifications(String currentUserId) {
        return notificationRepository.existsByIdNotNullAndReadFalseAndReceiverIdEquals(currentUserId);
    }

    @Override
    public ResponseEntity<?> createNewNotification(NotificationRequest notificationRequest, String currentUserId) {
        Notification notification = new Notification().toBuilder()
                .notificationType(notificationRequest.getNotificationType())
                .authorId(currentUserId)
                .receiverId(notificationRequest.getReceiverId())
                .dateTime(LocalDateTime.now())
                .read(false)
                .build();

        notificationRepository.save(notification);

        NotificationResponse notificationResponse = new NotificationResponse().toBuilder()
                .notificationDate(notification.getDateTime())
                .author(userService.getDetailsOfUserWithGivenId(notification.getAuthorId()))
                .content(createNotificationContent(notification.getNotificationType()))
                .read(notification.isRead())
                .build();

        simpMessagingTemplate.convertAndSend("/notify", notificationResponse);

        LOGGER.info("Added new notification by user with id {}.", currentUserId);

        return ResponseEntity.ok(notificationResponse);
    }

    private String createNotificationContent(NotificationType notificationType) {
        switch(notificationType) {
            case APPOINTMENT_CREATED:
                return "has just requested an appointment.";
            case APPOINTMENT_ACCEPTED:
                return "has just accepted an appointment request.";
            case APPOINTMENT_PAID:
                return "has just paid for an appointment.";
            case APPOINTMENT_REVIEWED:
                return "has just reviewd your services after an appointment.";
            case APPOINTMENT_FINISHED:
                return "has just finished your appointment.";
            case APPOINTMENT_CANCELED:
                return "has just canceled this appointment.";
            default:
                return "Error";
        }
    }
}