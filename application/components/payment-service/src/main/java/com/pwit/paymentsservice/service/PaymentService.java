package com.pwit.paymentsservice.service;

import com.pwit.paymentsservice.dto.PaymentRequest;
import com.pwit.paymentsservice.dto.SessionResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    SessionResponse createSession(PaymentRequest paymentRequest,
                                  String currentUserId,
                                  String currentUserEmail) throws StripeException;
}
