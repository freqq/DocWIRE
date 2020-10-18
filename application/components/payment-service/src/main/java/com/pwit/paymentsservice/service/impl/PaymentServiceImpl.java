package com.pwit.paymentsservice.service.impl;

import com.pwit.common.utils.Logger;
import com.pwit.paymentsservice.dto.PaymentRequest;
import com.pwit.paymentsservice.dto.SessionResponse;
import com.pwit.paymentsservice.properties.PaymentProperties;
import com.pwit.paymentsservice.service.util.PaymentMethodsProvider;
import com.pwit.paymentsservice.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.pwit.paymentsservice.service.util.PaymentMetada.APPOINTMENT_ID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private static final Logger LOGGER = new Logger();

    private final PaymentProperties paymentProperties;
    private final PaymentMethodsProvider paymentMethodsProvider;

    @Override
    public SessionResponse createSession(PaymentRequest paymentRequest,
                                         String currentUserId,
                                         String currentUserEmail) throws StripeException {
        String redirectUrl = paymentProperties.getCallbackUrl() + paymentRequest.getAppointmentId();

        SessionCreateParams params = SessionCreateParams.builder()
                .addAllPaymentMethodType(paymentMethodsProvider.getAllAvailablePaymentMethods())
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(redirectUrl + "?success=true")
                .setCancelUrl(redirectUrl + "?canceled=true")
                .addLineItem(
                    SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("PLN")
                                .setUnitAmount(Long.parseLong(paymentRequest.getPrice()) * 100)
                                .setProductData( createItem(paymentRequest)).build()
                        ).build()
                )
                .setCustomerEmail(currentUserEmail)
                .setClientReferenceId(currentUserId)
                .putMetadata(APPOINTMENT_ID, paymentRequest.getAppointmentId())
                .build();

        Session session = Session.create(params);
        LOGGER.info("Payment session for appointment {} created. ", paymentRequest.getAppointmentId());

        return new SessionResponse(session);
    }

    private SessionCreateParams.LineItem.PriceData.ProductData createItem(PaymentRequest paymentRequest) {
        String appointmentName = "Appointment no. " + paymentRequest.getAppointmentId();

        return SessionCreateParams.LineItem.PriceData.ProductData.builder()
                .setName(appointmentName)
                .setDescription(paymentRequest.getPaymentDescription())
                .build();
    }
}
