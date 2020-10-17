package com.pwit.paymentsservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("payments")
@TypeAlias("Payment")
public class Payment {
    @Id
    private String id;

    @Field("appointmentId")
    private String appointmentId;

    @Field("price")
    private String price;

    @Field("paidAt")
    private Instant paidAt;

    @Field("method")
    private PaymentMethod paymentMethod;
}
