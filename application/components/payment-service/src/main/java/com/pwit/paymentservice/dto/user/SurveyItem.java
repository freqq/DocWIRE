package com.pwit.paymentservice.dto.user;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class SurveyItem {
    @Field("question")
    String question;

    @Field("answer")
    String answer;
}
