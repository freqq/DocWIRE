package com.pwit.paymentsservice.service;

import com.pwit.paymentsservice.dto.PaymentResponse;
import com.stripe.model.checkout.Session;

import java.util.List;

public interface PaymentHistoryService {
    void handlePaymentRecord(Session session);
    List<PaymentResponse> getUserPaymentHistory(String currentUserId);
}
