package com.pwit.appointmentsservice.feign.notifications;

import com.pwit.appointmentsservice.feign.FeignConfiguration;
import com.pwit.common.notifications.NotificationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@FeignClient(
        name = "notifications-service-svc",
        url = "https://notifications-service-svc:8448",
        configuration = FeignConfiguration.class,
        fallback = NotificationsServiceFallback.class
)
public interface NotificationsService {
    @PostMapping("/api/notifications/create")
    ResponseEntity<?> createNewNotification(@RequestBody @Valid NotificationRequest notificationRequest);
}
