package com.pwit.messagesservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Document("messages")
@TypeAlias("ChatMessage")
@Data
@NoArgsConstructor
public class ChatMessage {
    private String id;

    @NotNull
    @Field("type")
    private ChatType type;

    @NotNull
    @Field("content")
    private String content;

    @NotNull
    @Field("sender")
    private String sender;

    @NotNull
    @Field("receiver")
    private String receiver;

    @NotNull
    @Field("read")
    private boolean read;

    @NotNull
    @Field("dateTime")
    private LocalDateTime dateTime;
}