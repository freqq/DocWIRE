package com.pwit.notificationsservice.service.impl;

import com.pwit.common.utils.Logger;
import com.pwit.notificationsservice.entity.SessionEntity;
import com.pwit.notificationsservice.feign.AppointmentsService;
import com.pwit.notificationsservice.repository.SessionRepository;
import com.pwit.notificationsservice.service.PaymentHistoryService;
import com.pwit.notificationsservice.service.PaymentWebhookService;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;

import static com.pwit.notificationsservice.service.util.PaymentMetada.APPOINTMENT_ID;

@Service
@RequiredArgsConstructor
public class PaymentWebhookServiceImpl implements PaymentWebhookService {
    private static final Logger LOGGER = new Logger();

    private final SessionRepository sessionRepository;
    private final PaymentHistoryService paymentHistoryService;
    private final AppointmentsService appointmentsService;

    @Override
    public ResponseEntity<?> handleCheckoutSessionEvent(Event event) {
        if (event.getType().equals("checkout.session.completed")) {
            Session session = (Session) event.getDataObjectDeserializer().getObject().orElseThrow();
            String appointmentId = session.getMetadata().get(APPOINTMENT_ID);

            if (session.getPaymentStatus().equals("paid")) {
                fulfillOrder(session);
                appointmentsService.setAppointmentsStateToPaid(appointmentId);
                return ResponseEntity.ok().build();
            }
        }

        return ResponseEntity.badRequest().build();
    }

    private void fulfillOrder(Session session) {
        if (!sessionRepository.existsByStripeIdAndIsHandledTrue(session.getId())) {

            SessionEntity sessionEntity = new SessionEntity().toBuilder()
                    .isSuccessful(true)
                    .isHandled(false)
                    .receivedAt(Instant.now())
                    .handledAt(null)
                    .stripeId(session.getId())
                    .clientReferenceId(session.getClientReferenceId())
                    .amountTotal(session.getAmountTotal())
                    .customer(session.getCustomer())
                    .customerEmail(session.getCustomerEmail())
                    .build();

            SessionEntity savedSession = sessionRepository.save(sessionEntity);
            paymentHistoryService.handlePaymentRecord(session);

            savedSession.setHandled(true);
            savedSession.setHandledAt(Instant.now());

            sessionRepository.save(sessionEntity);

            LOGGER.info("Payment succeded.");
        }
    }
}
