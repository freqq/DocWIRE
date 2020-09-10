package com.pwit.accountservice.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

import static com.pwit.accountservice.utils.Constants.RESET_KEY_VALID_FOR_HOURS;

@Data
public class PasswordReset {
    @Field("key")
    private String key;

    @Field("expire_at")
    private LocalDateTime expireAt = LocalDateTime.now().plusHours(RESET_KEY_VALID_FOR_HOURS);
}
