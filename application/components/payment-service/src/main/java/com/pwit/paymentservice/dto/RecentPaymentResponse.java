package com.pwit.paymentservice.dto;

import com.pwit.paymentservice.dto.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class RecentPaymentResponse {
    @Field("paidAt")
    private Instant paidAt;

    @Field("price")
    private Long price;

    @Field("paymentMethod")
    private String paymentMethod;

    @Field("doctor")
    private User doctor;
}
