package com.pwit.paymentsservice.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pwit.paymentsservice.dto.enumeration.AccountType;
import com.pwit.paymentsservice.dto.enumeration.Gender;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
public class User {
    @JsonProperty("userId")
    private String userId;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("birthDate")
    private LocalDate birthDate;

    @JsonProperty("gender")
    private Gender gender;

    @JsonProperty("langKey")
    private String langKey;

    @Enumerated(EnumType.STRING)
    @Field("accountType")
    private AccountType accountType;

    @Field("patientInfo")
    private PatientInfo patientInfo = null;

    @Field("doctorInfo")
    private DoctorInfo doctorInfo = null;
}


