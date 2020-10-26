package com.pwit.paymentservice.service.impl;

import com.pwit.paymentservice.dto.PaymentResponse;
import com.pwit.paymentservice.dto.RecentPaymentResponse;
import com.pwit.paymentservice.dto.response.RecentAppointment;
import com.pwit.paymentservice.dto.user.User;
import com.pwit.paymentservice.entity.Payment;
import com.pwit.paymentservice.feign.appointment.AppointmentsService;
import com.pwit.paymentservice.repository.PaymentRepository;
import com.pwit.paymentservice.service.PaymentHistoryService;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static com.pwit.paymentservice.service.util.PaymentMetada.APPOINTMENT_ID;
import static com.pwit.paymentservice.service.util.PaymentMetada.PATIENT_ID;

@Service
@RequiredArgsConstructor
public class PaymentHistoryServiceImpl implements PaymentHistoryService {
    private final PaymentRepository paymentRepository;
    private final AppointmentsService appointmentsService;

    @Override
    public void handlePaymentRecord(Session session) {
        String appointmentId = session.getMetadata().get(APPOINTMENT_ID);
        String patientId = session.getMetadata().get(PATIENT_ID);

        Payment payment = new Payment()
                .toBuilder()
                .paymentMethod(session.getPaymentMethodTypes().get(0))
                .paidAt(Instant.now())
                .appointmentId(appointmentId)
                .price(session.getAmountTotal())
                .patientId(patientId)
                .build();

        paymentRepository.save(payment);
    }

    @Override
    public List<PaymentResponse> getUserPaymentHistory(String currentUserId) {
        List<PaymentResponse> paymentResponses = new ArrayList<>();
        paymentRepository.findAllByPatientId(currentUserId).forEach(payment -> paymentResponses.add(createPaymentResponse(payment)));
        return paymentResponses;
    }

    @Override
    public ResponseEntity<?> getRecentPayment(String currentUserId) {
        Payment payment = paymentRepository.findTopByPatientIdOrderByPaidAt(currentUserId);
        RecentAppointment recentAppointment = appointmentsService.getAppointmentDetails(payment.getAppointmentId());
        User user =recentAppointment.getDoctor();

        RecentPaymentResponse recentPaymentResponse = new RecentPaymentResponse().toBuilder()
                .paymentMethod(payment.getPaymentMethod())
                .doctor(user)
                .paidAt(payment.getPaidAt())
                .price(payment.getPrice())
                .build();

        return ResponseEntity.ok(recentPaymentResponse);
    }

    private PaymentResponse createPaymentResponse(Payment payment) {
        return new PaymentResponse()
                .toBuilder()
                .paidAt(payment.getPaidAt())
                .paymentMethod(payment.getPaymentMethod())
                .price(payment.getPrice())
                .build();
    }
}
