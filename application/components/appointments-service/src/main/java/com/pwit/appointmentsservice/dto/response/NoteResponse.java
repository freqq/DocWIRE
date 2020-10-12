package com.pwit.appointmentsservice.dto.response;

import com.pwit.appointmentsservice.dto.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponse {
    @Field("doctorData")
    private User doctorData;

    @Field("content")
    private String content;

    @Field("dateOfNote")
    private LocalDateTime dateOfNote;
}
