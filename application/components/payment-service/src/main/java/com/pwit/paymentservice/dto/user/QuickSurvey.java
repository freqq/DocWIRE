package com.pwit.paymentservice.dto.user;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class QuickSurvey {
    @Field("smokeCigarette")
    private String smokeCigarette;

    @Field("recentlyInjured")
    private String recentlyInjured;

    @Field("highCholesterol")
    private String highCholesterol;

    @Field("diabetes")
    private String diabetes;
}
