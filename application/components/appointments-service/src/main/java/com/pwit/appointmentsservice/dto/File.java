package com.pwit.appointmentsservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("files")
@TypeAlias("File")
public class File {
    @Id
    @Indexed(unique = true)
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
