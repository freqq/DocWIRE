package com.pwit.accountservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.Nullable;
import com.pwit.accountservice.entity.DoctorInfo;
import com.pwit.accountservice.entity.PatientInfo;
import com.pwit.accountservice.entity.enumeration.AccountType;
import com.pwit.accountservice.entity.enumeration.Gender;
import com.pwit.accountservice.validator.NameConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class RegisterRequest {
    @JsonProperty("firstName")
    @NameConstraint
    @NotNull
    private String firstName;

    @JsonProperty("lastName")
    @NameConstraint
    @NotNull
    private String lastName;

    @JsonProperty("birthday")
    @Past
    @NotNull
    private LocalDate dayOfBirth;

    @Size(min = 2)
    @JsonProperty("langKey")
    @NotNull
    private String langKey;

    @JsonProperty("gender")
    @NotNull
    private Gender gender;

    @JsonProperty("accountType")
    @NotNull
    private AccountType accountType;

    @JsonProperty("patientInfo")
    @Nullable
    private PatientInfo patientInfo;

    @JsonProperty("doctorInfo")
    @Nullable
    private DoctorInfo doctorInfo;
}
