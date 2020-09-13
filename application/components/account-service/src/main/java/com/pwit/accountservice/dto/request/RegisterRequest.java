package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pwit.accountservice.entity.enumeration.Gender;
import com.pwit.accountservice.validator.NameConstraint;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class RegisterRequest {
    @JsonProperty("firstName")
    @NameConstraint
    @NotBlank
    private String firstName;

    @JsonProperty("lastName")
    @NameConstraint
    @NotBlank
    private String lastName;

    @JsonProperty("birthday")
    @Past
    @NotBlank
    private LocalDate dayOfBirth;

    @Size(min = 2)
    @JsonProperty("langKey")
    @NotBlank
    private String langKey;

    @JsonProperty("gender")
    @NotBlank
    private Gender gender;
}
