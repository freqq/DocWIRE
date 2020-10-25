package com.pwit.accountservice.service;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.NoteRequest;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.dto.request.ReviewRequest;
import com.pwit.accountservice.dto.response.DoctorDetailsResponse;
import com.pwit.accountservice.dto.response.PatientDetailsResponse;
import com.pwit.accountservice.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {
    ResponseEntity<?> createAccount(RegisterRequest registerRequest);
    ResponseEntity<?> getCurrentUserData();
    ResponseEntity<?> updateCurrentUserDetails(UserDetailsChangeDTO userDetailsChangeDTO);
    List<User> getAllUsersFilteredByFirstNameOrLastName(String search, Integer firstResult, Integer maxResults);
    List<User> getListOfDoctorsFilteredBySearchFilter(String search, Integer firstResult, Integer maxResults);
    ResponseEntity<?> setInitialDiagnoseDone(String currentUserId);
    ResponseEntity<PatientDetailsResponse> getDetailsOfUserWithGivenId(String userId);
    ResponseEntity<DoctorDetailsResponse> getDetailsODoctorWithGivenId(String doctorId);
    ResponseEntity<?> createNewNote(NoteRequest noteRequest, String currentUserId);
    ResponseEntity<?> searchUsers(String query, String currentUserId);
}
