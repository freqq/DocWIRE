package com.pwit.notificationsservice.service;

import com.pwit.common.notifications.NotificationRequest;
import org.springframework.http.ResponseEntity;

public interface NotificationsService {
    Long getNewNotificationsCount(String currentUserId);
    ResponseEntity<?> getNotificationsList(String currentUserId);
    ResponseEntity<?> createNewNotification(NotificationRequest notificationRequest, String currentUserId);
}
