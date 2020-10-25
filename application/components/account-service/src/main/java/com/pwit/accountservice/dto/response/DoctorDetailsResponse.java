package com.pwit.accountservice.dto.response;

import com.pwit.accountservice.entity.DoctorInfo;
import com.pwit.accountservice.entity.enumeration.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDetailsResponse {
    private String userId;

    private String langKey;

    private String firstName;

    private String lastName;

    private LocalDate dayOfBirth;

    private Gender gender;

    private DoctorInfo doctorInfo;

    private List<ReviewResponse> reviewResponses;

    private Double rating;
}
