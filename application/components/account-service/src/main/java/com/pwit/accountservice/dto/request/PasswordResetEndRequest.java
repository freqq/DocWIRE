package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static com.pwit.accountservice.utils.Constants.PASSWORD_MIN_LENGTH;
import static com.pwit.accountservice.utils.Constants.PASSWORD_MAX_LENGTH;

@Data
public class PasswordResetEndRequest {
    @NotBlank
    private String key;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    @JsonProperty("new_password")
    private String newPassword;
}
