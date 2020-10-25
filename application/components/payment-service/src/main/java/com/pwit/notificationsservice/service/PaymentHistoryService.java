package com.pwit.notificationsservice.service;

import com.pwit.notificationsservice.dto.PaymentResponse;
import com.stripe.model.checkout.Session;

import java.util.List;

public interface PaymentHistoryService {
    void handlePaymentRecord(Session session);
    List<PaymentResponse> getUserPaymentHistory(String currentUserId);
}
