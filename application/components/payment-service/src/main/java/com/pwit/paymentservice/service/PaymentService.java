package com.pwit.paymentservice.service;

import com.pwit.paymentservice.dto.PaymentRequest;
import com.pwit.paymentservice.dto.SessionResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    SessionResponse createSession(PaymentRequest paymentRequest,
                                  String currentUserId,
                                  String currentUserEmail) throws StripeException;
}
