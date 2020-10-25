package com.pwit.notificationsservice.service;

import com.pwit.notificationsservice.dto.PaymentRequest;
import com.pwit.notificationsservice.dto.SessionResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    SessionResponse createSession(PaymentRequest paymentRequest,
                                  String currentUserId,
                                  String currentUserEmail) throws StripeException;
}
