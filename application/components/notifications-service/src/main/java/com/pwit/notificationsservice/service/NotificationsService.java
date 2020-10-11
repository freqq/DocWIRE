package com.pwit.notificationsservice.service;

import com.pwit.notificationsservice.dto.Notification;
import com.pwit.notificationsservice.dto.enumeration.NotificationType;
import org.springframework.http.ResponseEntity;

public interface NotificationsService {
    Boolean checkIfAnyNewNotifications(String currentUserId);
    ResponseEntity<?> getNotificationsList(String currentUserId);
    Notification sendNotification(String author, NotificationType notificationType);
}
