package com.pwit.appointmentsservice.dto;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class SurveyItem {
    @Field("question")
    String question;

    @Field("answer")
    String answer;
}
