package com.pwit.accountservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("notes")
@TypeAlias("Note")
public class Note {
    @Field("dateOfNote")
    private LocalDateTime dateOfNote;

    @Field("authorId")
    private String authorId;

    @Field("patientId")
    private String patientId;

    @Field("content")
    private String content;
}
