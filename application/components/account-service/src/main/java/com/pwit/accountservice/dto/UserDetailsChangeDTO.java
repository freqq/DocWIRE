package com.pwit.accountservice.dto;

import com.pwit.accountservice.entity.enumeration.Gender;
import com.pwit.accountservice.validator.NameConstraint;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class UserDetailsChangeDTO {
    @Field("lang_key")
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
}
