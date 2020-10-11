package com.pwit.appointmentsservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("appointments")
@TypeAlias("Appointment")
public class Appointment {
    @NotNull
    @Field("doctorId")
    private String doctorId;

    @NotNull
    @Field("chosenSymptoms")
    private List<String> chosenSymptoms;

    @NotNull
    @Field("visitedRegions")
    private List<String> visitedRegions;

    @NotNull
    @Field("appointmentDate")
    private LocalDateTime appointmentDate;

    @NotNull
    @Field("quickSurvey")
    private QuickSurvey quickSurvey;

    @NotNull
    @Field("lastSurvey")
    private LastSurvey lastSurvey;
}
