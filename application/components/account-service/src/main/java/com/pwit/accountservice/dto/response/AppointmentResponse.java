package com.pwit.accountservice.dto.response;

import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.entity.enumeration.AppointmentState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    LocalDateTime appointmentDate;

    String appointmentId;

    User doctorData;

    AppointmentState appointmentState;
}
