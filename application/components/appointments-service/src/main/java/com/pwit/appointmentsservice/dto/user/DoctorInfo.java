package com.pwit.appointmentsservice.dto.user;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class DoctorInfo {
    @Field("title")
    private String title;

    @Field("specialization")
    private String specialization;

    @Field("price")
    private String price;

    @Field("aboutMe")
    private String aboutMe;
}
