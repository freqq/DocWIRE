package com.pwit.paymentsservice.service;

import com.pwit.paymentsservice.dto.PaymentRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

public interface PaymentService {
    Session createSession(PaymentRequest paymentRequest, String currentUserId) throws StripeException;
}
