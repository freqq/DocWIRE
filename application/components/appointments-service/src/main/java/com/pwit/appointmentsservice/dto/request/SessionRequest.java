package com.pwit.appointmentsservice.dto.request;

import io.openvidu.java.client.OpenViduRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class SessionRequest {
    @NotNull
    @NotBlank
    String username;

    @NotNull
    @NotBlank
    String sessionName;

    @NotNull
    OpenViduRole role;
}
