package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.Size;

import static com.pwit.accountservice.utils.Constants.PASSWORD_MAX_LENGTH;
import static com.pwit.accountservice.utils.Constants.PASSWORD_MIN_LENGTH;

@Data
public class PasswordChangeRequest {
    @JsonProperty("current_password")
    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String currentPassword;

    @JsonProperty("new_password")
    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String  newPassword;
}
