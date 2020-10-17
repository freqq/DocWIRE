package com.pwit.paymentsservice.controller;

import com.pwit.common.utils.Logger;
import com.pwit.paymentsservice.service.NotificationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.pwit.common.security.Authorities.ROLE_USER;
import static com.pwit.common.security.SecurityUtils.getCurrentUserId;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/notifications")
public class NotificationsController {
    private static final Logger LOGGER = new Logger();

    private final NotificationsService notificationsService;

    /**
     * Fetches list of notifications for current user
     */
    @Secured(ROLE_USER)
    @GetMapping("/")
    public ResponseEntity<?> getNotificationsList() {
        LOGGER.info("Fetching notifications list for user {}.", getCurrentUsername());
        return notificationsService.getNotificationsList(getCurrentUserId());
    }

    @GetMapping(value="/new")
    public Boolean checkIfAnyNewNotifications() {
        LOGGER.info("Checking if any new notifications for user {}.", getCurrentUsername());
        return notificationsService.checkIfAnyNewNotifications(getCurrentUserId());
    }
}
