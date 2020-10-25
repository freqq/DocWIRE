package com.pwit.appointmentsservice.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ReviewRequest {
    @NotNull
    String appointmentId;

    @NotNull
    String doctorId;

    @NotNull
    String patientId;

    @NotNull
    Long rating;
}
