package com.pwit.accountservice.validator;

import javax.validation.Payload;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static com.pwit.common.Constants.MAX_NAME_LENGTH;
import static com.pwit.common.Constants.MIN_NAME_LENGTH;

@NotNull
@Size(min = MIN_NAME_LENGTH, max = MAX_NAME_LENGTH)
@Pattern(regexp = "^[a-zA-Z\\\\s]+")
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface NameConstraint {
    // TODO Replace variables in string
    String message() default "Name/surname must be between " +
            "$MIN_NAME_LENGTH-$MAX_NAME_LENGTH characters long and can" +
            "contain only letters without spaces";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default { };
}
