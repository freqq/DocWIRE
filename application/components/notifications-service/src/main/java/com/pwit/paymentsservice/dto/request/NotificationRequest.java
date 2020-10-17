package com.pwit.paymentsservice.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.Nullable;
import com.pwit.paymentsservice.dto.enumeration.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {
    @NotNull
    @JsonProperty("notificationType")
    private NotificationType notificationType;

    @Nullable
    @JsonProperty("autorId")
    private String autorId;

    @Nullable
    @JsonProperty("content")
    private String content;

    @Nullable
    @JsonProperty("read")
    private boolean read;

    @Nullable
    @JsonProperty("dateTime")
    private LocalDateTime dateTime;
}