package com.pwit.accountservice.dto.response;

import com.pwit.accountservice.entity.User;
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
public class ReviewResponse {
    @Field("patientData")
    private User patientData;

    @Field("content")
    private String content;

    @Field("dateOfReview")
    private LocalDateTime dateOfReview;

    @Field("rating")
    private Long rating;
}
