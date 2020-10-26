package com.pwit.paymentservice.controller;

import com.pwit.common.utils.Logger;
import com.pwit.paymentservice.properties.PaymentProperties;
import com.pwit.paymentservice.service.PaymentWebhookService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment/webhook")
@RequiredArgsConstructor
public class PaymentWebhookController {
    private static final Logger LOGGER = new Logger();

    private final PaymentProperties paymentProperties;
    private final PaymentWebhookService paymentWebhookService;

    @PostMapping("/checkout")
    public ResponseEntity<?> handleSessionEvent(@RequestBody String body,
                                                @RequestHeader("Stripe-Signature") String stripeSignature) {
        LOGGER.info("Handling payment session event.");
        try {
            Event event = Webhook.constructEvent(body, stripeSignature, paymentProperties.getWebhookSecret());
            return paymentWebhookService.handleCheckoutSessionEvent(event);
        } catch (SignatureVerificationException e) {
            LOGGER.info(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
