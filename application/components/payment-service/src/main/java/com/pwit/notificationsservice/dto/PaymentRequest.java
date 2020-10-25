package com.pwit.notificationsservice.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class PaymentRequest {
    @NotNull
    String appointmentId;

    @NotNull
    String price;

    @NotNull
    String paymentDescription;
}
