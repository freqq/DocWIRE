package com.pwit.accountservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document("reviews")
@TypeAlias("Review")
public class Review {
    @Id
    private String id;

    @Field("dateOfReview")
    private LocalDateTime dateOfReview;

    @Field("authorId")
    private String authorId;

    @Field("doctorId")
    private String doctorId;

    @Field("content")
    private String content;

    @Field("rating")
    private Long rating;
}
