package com.pwit.notificationsservice.service;

import com.pwit.notificationsservice.dto.request.NotificationRequest;
import org.springframework.http.ResponseEntity;

public interface NotificationsService {
    Boolean checkIfAnyNewNotifications(String currentUserId);
    ResponseEntity<?> getNotificationsList(String currentUserId);
    ResponseEntity<?> createNewNotification(NotificationRequest notificationRequest, String currentUserId);
}
