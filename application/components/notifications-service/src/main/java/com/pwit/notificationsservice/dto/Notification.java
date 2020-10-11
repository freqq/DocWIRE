package com.pwit.notificationsservice.dto;


import com.pwit.notificationsservice.dto.enumeration.NotificationType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Document("notifications")
@TypeAlias("Notification")
public class Notification {
    private String id;

    @NotNull
    @Field("notification_type")
    private NotificationType notificationType;

    @NotNull
    @Field("authorId")
    private String authorId;

    @NotNull
    @Field("content")
    private String content;

    @NotNull
    @Field("read")
    private boolean read;

    @NotNull
    @Field("dateTime")
    private LocalDateTime dateTime;
}