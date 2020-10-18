package com.pwit.messagesservice.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class PatientInfo {
    @Field("weight")
    private String weight;

    @Field("height")
    private String height;

    @Field("address")
    private String address;

    @Field("zipCode")
    private String zipCode;

    @Field("city")
    private String city;

    @Field("country")
    private String country;

    @Field("initialDiagnoseDone")
    private boolean initialDiagnoseDone = false;
}
