package com.pwit.appointmentsservice.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UploadRequest {
    @NotNull
    String appointmentId;

    @NotNull
    String patientId;
}
