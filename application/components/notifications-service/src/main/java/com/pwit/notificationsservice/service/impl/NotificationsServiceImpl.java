package com.pwit.notificationsservice.service.impl;

import com.pwit.common.utils.Logger;
import com.pwit.notificationsservice.dto.Notification;
import com.pwit.notificationsservice.dto.enumeration.NotificationType;
import com.pwit.notificationsservice.dto.request.NotificationRequest;
import com.pwit.notificationsservice.mapper.NotificationMapper;
import com.pwit.notificationsservice.repository.NotificationRepository;
import com.pwit.notificationsservice.service.NotificationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@Service
@RequiredArgsConstructor
public class NotificationsServiceImpl implements NotificationsService {
    private static final Logger LOGGER = new Logger();

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public ResponseEntity<?> getNotificationsList(String currentUserId) {
        return ResponseEntity.ok(
                notificationRepository
                .findAllByIdNotNullAndAuthorIdNotOrderByDateTimeDesc(currentUserId)
                .stream()
                .map(notificationMapper::createNotificationToNotificationItem)
                .collect(Collectors.toList())
        );
    }

    @Override
    public Boolean checkIfAnyNewNotifications(String currentUserId) {
        return notificationRepository.existsByIdNotNullAndReadFalseAndAuthorIdNot(currentUserId);
    }

    @Override
    public Notification sendNotification(String author, NotificationType notificationType) {
        NotificationRequest notificationRequest = createNotificationRequest(author, notificationType);

        simpMessagingTemplate.convertAndSend("/notify", notificationRequest);

        LOGGER.info("Adding new notification by user {}.", getCurrentUsername());

        return notificationRepository
                .save(notificationMapper.createNotificationRequestToNotification(notificationRequest));
    }

    private NotificationRequest createNotificationRequest(String author, NotificationType notificationType) {
        String notificationContent = createNotificationContent(notificationType);

        return new NotificationRequest(
                notificationType,
                author,
                notificationContent,
                false,
                LocalDateTime.now()
        );
    }

    private String createNotificationContent(NotificationType notificationType) {
        switch(notificationType) {
            case APPOINTMENT_CREATED:
                return "has just requested an appointment.";
            case APPOINTMENT_ACCEPTED:
                return "has just accepted an appointment request.";
            default:
                return "Error";
        }
    }
}
