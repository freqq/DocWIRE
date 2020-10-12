package com.pwit.accountservice.service.impl;

import com.pwit.accountservice.dto.Note;
import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.NoteRequest;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.dto.response.NoteResponse;
import com.pwit.accountservice.dto.response.PatientDetailsResponse;
import com.pwit.accountservice.dto.response.SearchResponse;
import com.pwit.accountservice.entity.PatientInfo;
import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.entity.enumeration.AccountType;
import com.pwit.accountservice.error.exception.UserNotFoundException;
import com.pwit.accountservice.repository.NoteRepository;
import com.pwit.accountservice.repository.UserRepository;
import com.pwit.accountservice.service.AccountService;
import com.pwit.common.utils.Logger;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.pwit.common.security.SecurityUtils.getCurrentUserId;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {
    private static final Logger LOGGER = new Logger();

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;

    @Override
    public ResponseEntity<?> createAccount(RegisterRequest registerRequest) {
        User createdUser = new User().toBuilder()
                .userId(getCurrentUserId())
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .gender(registerRequest.getGender())
                .accountType(registerRequest.getAccountType())
                .langKey(registerRequest.getLangKey()).build();

        if(registerRequest.getAccountType() == AccountType.DOCTOR)
            createdUser.setDoctorInfo(registerRequest.getDoctorInfo());
        else
            createdUser.setPatientInfo(registerRequest.getPatientInfo());

        userRepository.save(createdUser);

        LOGGER.info("Successfully created new user with username '{}'", getCurrentUsername());

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> getCurrentUserData() {
        return Optional.ofNullable(userRepository.findUserByUserId(getCurrentUserId()))
                .map(foundUser -> ResponseEntity.ok().body(foundUser))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<?> updateCurrentUserDetails(UserDetailsChangeDTO updateAccountDTO) {
        Optional<User> foundUser = userRepository.findUserByUserId(getCurrentUserId());
        if(foundUser.isEmpty())
            throw new UserNotFoundException();

        checkRequestAndUpdateData(foundUser.get(), updateAccountDTO);
        userRepository.save(foundUser.get());

        LOGGER.debug("User with username '{}' updated successfully.", getCurrentUsername());

        return ResponseEntity.ok().body(foundUser);
    }

    // TODO Better query to match firstName + lastName and add pagination
    @Override
    public List<User> getAllUsersFilteredByFirstNameOrLastName(String search,
                                                               Integer firstResult,
                                                               Integer maxResults) {
        return userRepository.findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(search, search);
    }

    @Override
    public List<User> getListOfDoctorsFilteredBySearchFilter(String search,
                                                             Integer firstResult,
                                                             Integer maxResults) {
        List<User> users =  userRepository.
                findByAccountTypeEqualsAndDoctorInfoSpecializationContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                    AccountType.DOCTOR, search, search, search);

        List<User> doctors = new ArrayList<>();

        for(User user : users) {
            if(user.getAccountType() == AccountType.DOCTOR)
                doctors.add(user);
        }

        return doctors;
    }

    @Override
    public ResponseEntity<?> setInitialDiagnoseDone(String currentUserId) {
        Optional<User> user = userRepository.findUserByUserId(currentUserId);

        if(user.isEmpty())
            return ResponseEntity.notFound().build();

        PatientInfo patientInfo = user.get().getPatientInfo();
        patientInfo.setInitialDiagnoseDone(true);
        user.get().setPatientInfo(patientInfo);

        userRepository.save(user.get());

        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<PatientDetailsResponse>  getDetailsOfUserWithGivenId(String userId) {
        Optional<User> foundUser = userRepository.findUserByUserId(userId);
        List<Note> notes = noteRepository.findAllByPatientIdOrderByDateOfNote(userId);
        List<NoteResponse> noteResponses = new ArrayList<>();

        for(Note note : notes){
            NoteResponse noteResponse = new NoteResponse()
                    .toBuilder()
                    .dateOfNote(note.getDateOfNote())
                    .content(note.getContent())
                    .doctorData(userRepository.findUserByUserId(note.getAuthorId()).get())
                    .build();
            noteResponses.add(noteResponse);
        }


        if(foundUser.isEmpty())
            return ResponseEntity.notFound().build();

        PatientDetailsResponse patientDetailsResponse = new PatientDetailsResponse().toBuilder()
                .patientInfo(foundUser.get().getPatientInfo())
                .accountType(foundUser.get().getAccountType())
                .dayOfBirth(foundUser.get().getDayOfBirth())
                .doctorInfo(foundUser.get().getDoctorInfo())
                .firstName(foundUser.get().getFirstName())
                .gender(foundUser.get().getGender())
                .langKey(foundUser.get().getLangKey())
                .lastName(foundUser.get().getLastName())
                .noteResponses(noteResponses)
                .userId(foundUser.get().getUserId())
                .build();

        return new ResponseEntity<>(patientDetailsResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> createNewNote(NoteRequest noteRequest, String currentUserId) {
        Note note = new Note()
                .toBuilder()
                .dateOfNote(noteRequest.getDateOfNote())
                .patientId(noteRequest.getPatientId())
                .content(noteRequest.getContent())
                .authorId(currentUserId)
                .build();

        noteRepository.save(note);

        NoteResponse noteResponse = new NoteResponse()
                .toBuilder()
                .doctorData(userRepository.findUserByUserId(note.getAuthorId()).get())
                .content(note.getContent())
                .dateOfNote(note.getDateOfNote())
                .build();

        return ResponseEntity.ok(noteResponse);
    }

    @Override
    public ResponseEntity<?> searchUsers(String query, String currentUserId) {
        List<User> foundUsers =
                userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseAndUserIdNotContaining(query, query, currentUserId);

        List<User> doctors = new ArrayList<>();
        List<User> patients = new ArrayList<>();

        for(User user : foundUsers)
            if(user.getAccountType() == AccountType.DOCTOR)
                doctors.add(user);
            else
                patients.add(user);

        SearchResponse searchResponse = new SearchResponse()
                .toBuilder()
                .doctors(doctors)
                .patients(patients)
                .build();

        return ResponseEntity.ok(searchResponse);
    }

    private void checkRequestAndUpdateData(User foundUser, UserDetailsChangeDTO updateAccountDTO) {
        if(updateAccountDTO.getDayOfBirth() != null)
            foundUser.setDayOfBirth(updateAccountDTO.getDayOfBirth());

        if(updateAccountDTO.getFirstName() != null)
            foundUser.setFirstName(updateAccountDTO.getFirstName());

        if(updateAccountDTO.getLastName() != null)
            foundUser.setLastName(updateAccountDTO.getLastName());

        if(updateAccountDTO.getGender() != null)
            foundUser.setGender(updateAccountDTO.getGender());

        if(updateAccountDTO.getLangKey() != null)
            foundUser.setLangKey(updateAccountDTO.getLangKey());
    }
}
