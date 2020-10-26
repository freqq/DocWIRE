package com.pwit.appointmentsservice.dto.response;

import com.pwit.appointmentsservice.dto.QuickSurvey;
import com.pwit.appointmentsservice.dto.SurveyItem;
import com.pwit.appointmentsservice.dto.enumeration.AppointmentState;
import com.pwit.appointmentsservice.dto.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class RecentAppointment {
    @NotNull
    private String id;

    @NotNull
    private User doctor;

    @NotNull
    private User patient;

    @NotNull
    private String appointmentPrice;

    @NotNull
    private AppointmentState appointmentState;

    @NotNull
    private List<String> chosenSymptoms;

    @NotNull
    private List<String> visitedRegions;

    @NotNull
    private LocalDateTime appointmentDate;

    @NotNull
    private QuickSurvey quickSurvey;

    @NotNull
    private List<FileResponse> listOfFiles;

    @NotNull
    private List<SurveyItem> lastSurvey;
}
