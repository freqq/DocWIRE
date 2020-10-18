package com.pwit.paymentsservice.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    @Field("paidAt")
    private Instant paidAt;

    @Field("price")
    private Long price;

    @Field("paymentMethod")
    private String paymentMethod;
}
