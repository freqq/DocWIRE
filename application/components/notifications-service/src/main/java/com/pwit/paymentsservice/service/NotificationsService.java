package com.pwit.paymentsservice.service;

import com.pwit.paymentsservice.dto.Notification;
import com.pwit.paymentsservice.dto.enumeration.NotificationType;
import org.springframework.http.ResponseEntity;

public interface NotificationsService {
    Boolean checkIfAnyNewNotifications(String currentUserId);
    ResponseEntity<?> getNotificationsList(String currentUserId);
    Notification sendNotification(String author, NotificationType notificationType);
}
