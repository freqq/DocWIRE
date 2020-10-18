package com.pwit.paymentsservice.controller;

import com.pwit.common.utils.Logger;
import com.pwit.paymentsservice.dto.PaymentRequest;
import com.pwit.paymentsservice.dto.PaymentResponse;
import com.pwit.paymentsservice.service.PaymentHistoryService;
import com.pwit.paymentsservice.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static com.pwit.common.security.SecurityUtils.getCurrentUserId;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private static final Logger LOGGER = new Logger();

    private final PaymentService paymentService;
    private final PaymentHistoryService paymentHistoryService;

    @PostMapping("/session")
    public Session createSession(@RequestBody @Valid PaymentRequest paymentRequest) throws StripeException {
        LOGGER.info("Creating payment session for user {}.", getCurrentUsername());
        return paymentService.createSession(paymentRequest, getCurrentUserId());
    }

    @GetMapping("/history")
    public List<PaymentResponse> getUserPaymentHistory() {
        LOGGER.info("Creating payment session for user {}.", getCurrentUsername());
        return paymentHistoryService.getUserPaymentHistory(getCurrentUserId());
    }
}
