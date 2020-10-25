package com.pwit.notificationsservice.dto.response;

import com.pwit.notificationsservice.dto.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    @NotNull
    private String content;

    @NotNull
    private LocalDateTime notificationDate;

    @NotNull
    private User author;

    @NotNull
    private boolean read;

    @NotNull
    private String appointmentId;
}
