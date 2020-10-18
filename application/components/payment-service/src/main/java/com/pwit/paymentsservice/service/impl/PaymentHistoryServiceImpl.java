package com.pwit.paymentsservice.service.impl;

import com.pwit.common.utils.Logger;
import com.pwit.paymentsservice.dto.PaymentResponse;
import com.pwit.paymentsservice.entity.Payment;
import com.pwit.paymentsservice.repository.PaymentRepository;
import com.pwit.paymentsservice.service.PaymentHistoryService;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static com.pwit.common.security.SecurityUtils.getCurrentUserId;

@Service
@RequiredArgsConstructor
public class PaymentHistoryServiceImpl implements PaymentHistoryService {
    private static final Logger LOGGER = new Logger();

    private final PaymentRepository paymentRepository;

    @Override
    public void handlePaymentRecord(Session session) {
        String appointmentId = session.getObject();
        LOGGER.info(appointmentId);

        Payment payment = new Payment().toBuilder()
                .paymentMethod(session.getPaymentMethodTypes().get(0))
                .paidAt(Instant.now())
                .appointmentId("123")
                .price(session.getAmountTotal())
                .patientId(getCurrentUserId())
                .build();

        paymentRepository.save(payment);
    }

    @Override
    public List<PaymentResponse> getUserPaymentHistory(String currentUserId) {
        List<PaymentResponse> paymentResponses = new ArrayList<>();
        paymentRepository.findAll().forEach(payment -> paymentResponses.add(createPaymentResponse(payment)));
        return paymentResponses;
    }

    private PaymentResponse createPaymentResponse(Payment payment) {
        return new PaymentResponse().toBuilder()
                .paidAt(payment.getPaidAt())
                .paymentMethod(payment.getPaymentMethod())
                .price(payment.getPrice())
                .build();
    }
}
