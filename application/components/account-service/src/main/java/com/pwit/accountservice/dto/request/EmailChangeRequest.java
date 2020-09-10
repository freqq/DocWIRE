package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class EmailChangeRequest {
    @JsonProperty("new_email")
    @Email
    private String newEmail;

    @JsonProperty("password")
    private String password;
}
