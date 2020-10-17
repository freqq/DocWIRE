package com.pwit.paymentsservice.controller;

import com.pwit.common.utils.Logger;
import com.pwit.paymentsservice.dto.PaymentRequest;
import com.pwit.paymentsservice.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.pwit.common.security.SecurityUtils.getCurrentUserId;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private static final Logger LOGGER = new Logger();

    private final PaymentService paymentService;

    @PostMapping("/session")
    public Session createSession(@RequestBody @Valid PaymentRequest paymentRequest) throws StripeException {
        LOGGER.info("Creating payment session for user {}.", getCurrentUsername());
        return paymentService.createSession(paymentRequest, getCurrentUserId());
    }
}
