package com.pwit.paymentsservice.service.util;

import com.pwit.paymentsservice.entity.PaymentMethod;
import com.pwit.paymentsservice.repository.PaymentMethodRepository;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentMethodsProvider {
    private final PaymentMethodRepository paymentMethodRepository;

    public List<SessionCreateParams.PaymentMethodType> getAllAvailablePaymentMethods() {
        List<SessionCreateParams.PaymentMethodType> paymentMethodTypes = new ArrayList<>();
        paymentMethodRepository.findAll().forEach(paymentMethod -> paymentMethodTypes.add(paymentMethod.getMethod()));
        return paymentMethodTypes;
    }

    public List<SessionCreateParams.PaymentMethodType> getEnabledPaymentMethods() {
        List<SessionCreateParams.PaymentMethodType> paymentMethodTypes = new ArrayList<>();
        paymentMethodRepository.findAllByIsEnabledTrue().forEach(paymentMethod -> paymentMethodTypes.add(paymentMethod.getMethod()));
        return paymentMethodTypes;
    }
}
