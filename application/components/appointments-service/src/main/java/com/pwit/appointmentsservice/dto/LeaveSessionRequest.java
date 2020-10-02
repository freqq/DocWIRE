package com.pwit.appointmentsservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class LeaveSessionRequest {
    @NotNull
    @NotBlank
    String sessionName;

    @NotNull
    @NotBlank
    String token;
}
