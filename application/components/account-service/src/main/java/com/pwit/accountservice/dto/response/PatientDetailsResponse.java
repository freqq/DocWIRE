package com.pwit.accountservice.dto.response;

import com.pwit.accountservice.entity.DoctorInfo;
import com.pwit.accountservice.entity.PatientInfo;
import com.pwit.accountservice.entity.enumeration.AccountType;
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
public class PatientDetailsResponse {
    private String userId;

    private String langKey;

    private String firstName;

    private String lastName;

    private LocalDate dayOfBirth;

    private Gender gender;

    private AccountType accountType;

    private PatientInfo patientInfo;

    private DoctorInfo doctorInfo;

    private List<NoteResponse> noteResponses;

    private List<ReviewResponse> reviewResponses;
}
