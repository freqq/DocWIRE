package com.pwit.notificationsservice.controller;

import com.pwit.common.utils.Logger;
import com.pwit.notificationsservice.dto.PaymentRequest;
import com.pwit.notificationsservice.dto.PaymentResponse;
import com.pwit.notificationsservice.dto.SessionResponse;
import com.pwit.notificationsservice.service.PaymentHistoryService;
import com.pwit.notificationsservice.service.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static com.pwit.common.security.SecurityUtils.getCurrentUserId;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;
import static com.pwit.common.security.SecurityUtils.getCurrentUserEmail;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private static final Logger LOGGER = new Logger();

    private final PaymentService paymentService;
    private final PaymentHistoryService paymentHistoryService;

    @PostMapping("/session")
    public SessionResponse createSession(@RequestBody @Valid PaymentRequest paymentRequest) throws StripeException {
        LOGGER.info("Creating payment session for user {}.", getCurrentUsername());
        return paymentService.createSession(paymentRequest, getCurrentUserId(), getCurrentUserEmail());
    }

    @GetMapping("/history")
    public List<PaymentResponse> getUserPaymentHistory() {
        LOGGER.info("Creating payment session for user {}.", getCurrentUsername());
        return paymentHistoryService.getUserPaymentHistory(getCurrentUserId());
    }
}
