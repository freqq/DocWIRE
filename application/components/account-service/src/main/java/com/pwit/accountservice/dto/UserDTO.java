package com.pwit.accountservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pwit.accountservice.entity.enumeration.Gender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDTO {
    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("birth_date")
    private LocalDate birthDate;

    @JsonProperty("gender")
    private Gender gender;

    @JsonProperty("lang_key")
    private String langKey;
}
