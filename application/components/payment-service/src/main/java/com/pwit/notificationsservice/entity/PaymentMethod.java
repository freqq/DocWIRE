package com.pwit.notificationsservice.entity;

import com.stripe.param.checkout.SessionCreateParams;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("payment_methods")
@TypeAlias("PaymentMethod")
public class PaymentMethod {
    @Id
    private String id;

    @Field("method")
    @Indexed(unique = true)
    private SessionCreateParams.PaymentMethodType method;

    @Field("isEnabled")
    private boolean isEnabled;
}
