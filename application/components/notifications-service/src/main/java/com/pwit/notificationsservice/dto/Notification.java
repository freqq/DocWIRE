package com.pwit.notificationsservice.dto;

import com.pwit.common.notifications.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("notifications")
@TypeAlias("Notification")
public class Notification {
    @Id
    @Indexed(unique = true)
    private String id;

    @NotNull
    @Field("notification_type")
    private NotificationType notificationType;

    @NotNull
    @Field("appointmentId")
    private String appointmentId;

    @NotNull
    @Field("authorId")
    private String authorId;

    @NotNull
    @Field("receiverId")
    private String receiverId;

    @NotNull
    @Field("read")
    private boolean read;

    @NotNull
    @Field("dateTime")
    private LocalDateTime dateTime;
}