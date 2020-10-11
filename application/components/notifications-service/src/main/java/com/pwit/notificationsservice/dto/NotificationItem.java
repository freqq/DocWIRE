package com.pwit.notificationsservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pwit.notificationsservice.dto.enumeration.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NotificationItem {
    @JsonProperty("id")
    private String id;

    @JsonProperty("notification_type")
    private NotificationType notificationType;

    @JsonProperty("authorId")
    private String authorId;

    @JsonProperty("content")
    private String content;

    @JsonProperty("read")
    private boolean read;

    @JsonProperty("dateTime")
    private LocalDateTime dateTime;
}
