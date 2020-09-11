package com.pwit.accountservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Set;

import static com.pwit.accountservice.utils.Constants.MAX_EMAIL_LENGTH;
import static com.pwit.accountservice.utils.Constants.MIN_EMAIL_LENGTH;
import static com.pwit.accountservice.utils.Constants.MIN_USERNAME_LENGTH;
import static com.pwit.accountservice.utils.Constants.MAX_USERNAME_LENGTH;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@TypeAlias("User")
@Document(collection = "users")
public class User {
    @Indexed(unique = true)
    @Size(min = MIN_USERNAME_LENGTH, max = MAX_USERNAME_LENGTH)
    private String username;

    @Indexed(unique = true)
    @Email
    @Size(min = MIN_EMAIL_LENGTH, max = MAX_EMAIL_LENGTH)
    private String email;

    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60) // 60 - Length of hash
    private String password;

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

    @Field("authorities")
    private Set<Authority> authorities;

    @Field("pwd_reset")
    @Builder.Default
    private PasswordReset passwordReset = null;

    @Field("email_change")
    @Builder.Default
    private EmailChange emailChange = null;

}
