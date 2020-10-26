package com.pwit.paymentservice.service;

import com.pwit.paymentservice.dto.PaymentResponse;
import com.stripe.model.checkout.Session;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PaymentHistoryService {
    void handlePaymentRecord(Session session);
    List<PaymentResponse> getUserPaymentHistory(String currentUserId);
    ResponseEntity<?> getRecentPayment(String currentUserId);
}
