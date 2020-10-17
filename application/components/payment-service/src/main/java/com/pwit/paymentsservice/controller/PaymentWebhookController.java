package com.pwit.paymentsservice.controller;

import com.pwit.common.utils.Logger;
import com.pwit.paymentsservice.properties.PaymentProperties;
import com.pwit.paymentsservice.service.PaymentWebhookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment/webhook")
@RequiredArgsConstructor
public class PaymentWebhookController {
    private static final Logger LOGGER = new Logger();

    private final PaymentProperties paymentProperties;
    private final PaymentWebhookService paymentWebhookService;
}
