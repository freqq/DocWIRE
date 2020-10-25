package com.pwit.accountservice.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Data
public class Review {
    @Field("rating")
    private Long rating;

    @Field("appointmentId")
    private String appointmentId;

    @Field("doctorId")
    private String doctorId;

    @Field("patientId")
    private String patientId;

    @Field("ratingDate")
    private Instant ratingDate;
}
