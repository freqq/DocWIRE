package com.pwit.accountservice.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NoteRequest {
    @NotNull
    @NotBlank
    String content;

    @NotNull
    @NotBlank
    String patientId;

    @NotNull
    LocalDateTime dateOfNote;
}
