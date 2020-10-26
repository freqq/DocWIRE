package com.pwit.paymentservice.migration;

import com.github.cloudyrock.mongock.ChangeLog;
import com.github.cloudyrock.mongock.ChangeSet;
import com.pwit.common.utils.Logger;
import com.pwit.paymentservice.entity.PaymentMethod;
import com.pwit.paymentservice.repository.PaymentMethodRepository;
import com.stripe.param.checkout.SessionCreateParams;

import java.util.ArrayList;
import java.util.List;

@ChangeLog
public class PaymentDbChangeLog {
    private static final Logger LOGGER = new Logger();

    @ChangeSet(order = "01", author = "pwit", id="add-default-payment-methods")
    public void addDefaultPaymentMethods(PaymentMethodRepository paymentMethodRepository) {
        LOGGER.info("Adding default payment methods: credit card and Przelewy24");

        List<PaymentMethod> paymentMethodList = new ArrayList<>();
        paymentMethodList.add(createPaymentMethod(SessionCreateParams.PaymentMethodType.P24, true));
        paymentMethodList.add(createPaymentMethod(SessionCreateParams.PaymentMethodType.CARD, true));

        paymentMethodRepository.saveAll(paymentMethodList);
    }

    private PaymentMethod createPaymentMethod(SessionCreateParams.PaymentMethodType paymentMethodType, boolean isEnabled) {
        return new PaymentMethod()
                .toBuilder()
                .method(paymentMethodType)
                .isEnabled(isEnabled)
                .build();
    }
}
