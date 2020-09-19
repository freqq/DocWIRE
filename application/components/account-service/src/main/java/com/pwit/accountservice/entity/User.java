package com.pwit.accountservice.entity;

import com.pwit.accountservice.entity.enumeration.AccountType;
import com.pwit.accountservice.entity.enumeration.Gender;
import com.pwit.accountservice.validator.NameConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@TypeAlias("User")
@Document(collection = "users")
public class User {
    @Indexed(unique = true)
    private String userId;

    @Field("langKey")
    @Size(min = 2, max = 10)
    private String langKey;

    @NameConstraint
    @Field("firstName")
    private String firstName;

    @NameConstraint
    @Field("lastName")
    private String lastName;

    @Field("birthday")
    @Past
    private LocalDate dayOfBirth;

    @Field("gender")
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Field("accountType")
    private AccountType accountType;

    @Field("patientInfo")
    private PatientInfo patientInfo = null;

    @Field("doctorInfo")
    private DoctorInfo doctorInfo = null;
}
