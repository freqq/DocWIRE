package com.pwit.appointmentsservice.feign.notifications;

import com.pwit.common.notifications.NotificationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
public class NotificationsServiceFallback implements NotificationsService {
    @Override
    public ResponseEntity<?> createNewNotification(@Valid NotificationRequest notificationRequest) {
        return null;
    }
}
