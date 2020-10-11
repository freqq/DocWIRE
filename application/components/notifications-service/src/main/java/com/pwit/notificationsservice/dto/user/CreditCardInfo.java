package com.pwit.notificationsservice.dto.user;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Past;

@Data
public class CreditCardInfo {
    @Field("number")
    @Past
    private String number;

    @Field("cvc")
    @Past
    private String cvc;

    @Field("name")
    @Past
    private String name;

    @Field("expiry")
    @Past
    private String expiry;
}
