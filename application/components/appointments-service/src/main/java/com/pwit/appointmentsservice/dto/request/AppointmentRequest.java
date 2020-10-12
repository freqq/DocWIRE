package com.pwit.appointmentsservice.dto.request;

import com.pwit.appointmentsservice.dto.QuickSurvey;
import com.pwit.appointmentsservice.dto.SurveyItem;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AppointmentRequest {
    @NotNull
    String doctorId;

    @NotNull
    String patientId;

    @NotNull
    List<String> chosenSymptoms;

    @NotNull
    List<String> visitedRegions;

    @NotNull
    LocalDateTime appointmentDate;

    @NotNull
    QuickSurvey quickSurvey;

    @NotNull
    List<SurveyItem> lastSurvey;
}
