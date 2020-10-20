package com.pwit.accountservice.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class ReviewRequest {
    @NotNull
    @NotBlank
    String content;

    @NotNull
    @NotBlank
    String doctorId;

    @NotNull
    LocalDateTime dateOReview;

    @NotNull
    Long rating;
}
