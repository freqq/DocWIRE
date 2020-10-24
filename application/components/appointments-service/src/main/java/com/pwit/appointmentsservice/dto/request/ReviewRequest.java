package com.pwit.appointmentsservice.dto.request;

import lombok.Data;

@Data
public class ReviewRequest {
    String appointmentId;

    String doctorId;

    String patientdD;

    Long rating;
}
