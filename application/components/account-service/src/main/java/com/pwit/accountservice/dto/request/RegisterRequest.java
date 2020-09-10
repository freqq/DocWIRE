package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import static com.pwit.accountservice.utils.Constants.PASSWORD_MAX_LENGTH;
import static com.pwit.accountservice.utils.Constants.PASSWORD_MIN_LENGTH;

@Data
public class RegisterRequest {
    @JsonProperty("username")
    @Size(min = 5, max = 32)
    private String username;

    @JsonProperty("email")
    @Pattern(regexp = ".+@.+\\..+", message = "Please provide a valid email address. Min length: 5, max: 32")
    @Size(min = 5, max = 32)
    private String email;

    @Size(
            min = PASSWORD_MIN_LENGTH,
            max = PASSWORD_MAX_LENGTH,
            message = "Password must be between $PASSWORD_MIN_LENGTH to $PASSWORD_MAX_LENGTH characters long"
    )
    @NotBlank
    @JsonProperty("password")
    private String password;

    @Size(min = 2)
    @JsonProperty("lang_key")
    private String langKey;
}
