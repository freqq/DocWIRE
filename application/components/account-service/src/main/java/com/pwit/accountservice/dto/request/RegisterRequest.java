package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pwit.accountservice.entity.enumeration.Gender;
import com.pwit.accountservice.validator.NameConstraint;
import lombok.Data;

import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class RegisterRequest {
    @JsonProperty("firstName")
    @NameConstraint
    private String firstName;

    @JsonProperty("lastName")
    @NameConstraint
    private String lastName;

    @JsonProperty("birthday")
    @Past
    private LocalDate dayOfBirth;

    @Size(min = 2)
    @JsonProperty("langKey")
    private String langKey;

    @JsonProperty("gender")
    private Gender gender;
}
