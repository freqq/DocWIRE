package com.pwit.accountservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

import static com.pwit.accountservice.utils.Constants.EMAIL_CHANGE_VALID_FOR_HOURS;

@Data
public class EmailChange {
    @Field("new_email")
    private String newEmail;

    @Field("key")
    private String key;

    @Field("expire_at")
    private LocalDateTime expireAt = LocalDateTime.now().plusHours(EMAIL_CHANGE_VALID_FOR_HOURS);
}
