package com.pwit.messagesservice.entity.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pwit.messagesservice.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ChatMessageItem {
    @JsonProperty("id")
    private String id;

    @JsonProperty("sender")
    private User sender;

    @JsonProperty("receiver")
    private User receiver;

    @JsonProperty("dateTime")
    private LocalDateTime time;

    @JsonProperty("content")
    private String message;

    @JsonProperty("unread")
    private boolean unread;

    @JsonProperty("active")
    private boolean active;
}
