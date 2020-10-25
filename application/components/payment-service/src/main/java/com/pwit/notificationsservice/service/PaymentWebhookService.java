package com.pwit.notificationsservice.service;

import com.stripe.model.Event;
import org.springframework.http.ResponseEntity;

public interface PaymentWebhookService {
    ResponseEntity<?> handleCheckoutSessionEvent(Event event);
}
