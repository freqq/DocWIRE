package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class PasswordResetRequest {
    @Email
    @JsonProperty("email")
    private String email;
}
