package com.pwit.common.notifications;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class NotificationRequest {
    @NotNull
    @Field("notificationType")
    private NotificationType notificationType;

    @NotNull
    @Field("receiverId")
    private String receiverId;
}