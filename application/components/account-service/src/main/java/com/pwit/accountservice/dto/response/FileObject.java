package com.pwit.accountservice.dto.response;

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
public class FileObject {
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("appointmentId")
    private String appointmentId;

    @NotNull
    @Field("patientId")
    private String patientId;

    @NotNull
    @Field("content")
    private byte[] content;
}
