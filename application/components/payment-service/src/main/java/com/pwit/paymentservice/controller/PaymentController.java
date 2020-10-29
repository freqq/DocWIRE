package com.pwit.paymentservice.controller;

import com.pwit.common.utils.Logger;
import com.pwit.paymentservice.dto.PaymentRequest;
import com.pwit.paymentservice.dto.PaymentResponse;
import com.pwit.paymentservice.dto.SessionResponse;
import com.pwit.paymentservice.service.PaymentHistoryService;
import com.pwit.paymentservice.service.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static com.pwit.common.security.SecurityUtils.getCurrentUserId;
import static com.pwit.common.security.SecurityUtils.getCurrentUserEmail;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private static final Logger LOGGER = new Logger();

    private final PaymentService paymentService;
    private final PaymentHistoryService paymentHistoryService;

    /**
     * Creating new payment session
     *
     * @param paymentRequest Body of new payment request
     */
    @PostMapping("/session")
    public SessionResponse createSession(@RequestBody @Valid PaymentRequest paymentRequest) throws StripeException {
        LOGGER.info("Creating payment session for user with id {}.", getCurrentUserId());
        return paymentService.createSession(paymentRequest, getCurrentUserId(), getCurrentUserEmail());
    }

    /**
     * Getting all payment records for current user
     */
    @GetMapping("/history")
    public List<PaymentResponse> getUserPaymentHistory() {
        LOGGER.info("Getting list of payments history for user with id {}.", getCurrentUserId());
        return paymentHistoryService.getUserPaymentHistory(getCurrentUserId());
    }

    /**
     * Getting most recent payment record for current user
     */
    @GetMapping("/history/recent")
    public ResponseEntity<?> getRecentPayment() {
        LOGGER.info("Getting most recent payment entry for user with id {}.", getCurrentUserId());
        return paymentHistoryService.getRecentPayment(getCurrentUserId());
    }
}
