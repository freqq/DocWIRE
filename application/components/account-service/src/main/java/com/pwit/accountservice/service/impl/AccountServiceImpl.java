package com.pwit.accountservice.service.impl;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.entity.PatientInfo;
import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.entity.enumeration.AccountType;
import com.pwit.accountservice.error.exception.UserNotFoundException;
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
    public ResponseEntity<User>  getDetailsOfUserWithGivenId(String userId) {
        Optional<User> foundUser = userRepository.findUserByUserId(userId);
        return foundUser.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> ResponseEntity.notFound().build());
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
