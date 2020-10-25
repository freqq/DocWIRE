package com.pwit.notificationsservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("sessions")
@TypeAlias("SessionEntity")
public class SessionEntity {
    @Id
    private String id;

    @Indexed(unique = true)
    private String stripeId;

    private boolean isSuccessful;

    private boolean isHandled;

    private Instant receivedAt;

    private Instant handledAt = null;

    private String clientReferenceId;

    private Long amountTotal;

    private String customer;

    private String customerEmail;
}
