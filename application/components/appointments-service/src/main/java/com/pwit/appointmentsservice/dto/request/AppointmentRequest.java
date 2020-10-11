package com.pwit.appointmentsservice.dto.request;

import com.pwit.appointmentsservice.dto.LastSurvey;
import com.pwit.appointmentsservice.dto.QuickSurvey;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AppointmentRequest {
    @NotNull
    String doctorId;

    @NotNull
    List<String> chosenSymptoms;

    @NotNull
    List<String> visitedRegions;

    @NotNull
    LocalDateTime appointmentDate;

    @NotNull
    QuickSurvey quickSurvey;

    @NotNull
    LastSurvey lastSurvey;
}
