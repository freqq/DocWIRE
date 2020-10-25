package com.pwit.notificationsservice.dto.request;

import com.pwit.common.notifications.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {
    @NotNull
    @Field("notificationType")
    private NotificationType notificationType;

    @NotNull
    @Field("receiverId")
    private String receiverId;
}