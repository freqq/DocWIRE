package com.pwit.appointmentsservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("reviews")
@TypeAlias("Review")
public class Review {
    @Field("rating")
    private Long rating;

    @Field("appointmentId")
    private String appointmentId;

    @Field("doctorId")
    private String doctorId;

    @Field("patientId")
    private String patientId;
}
