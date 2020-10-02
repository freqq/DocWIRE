package com.pwit.accountservice.service.impl;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.entity.enumeration.AccountType;
import com.pwit.accountservice.error.exception.UserNotFoundException;
import com.pwit.accountservice.repository.UserRepository;
import com.pwit.accountservice.service.AccountService;
import com.pwit.common.utils.Logger;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
        LOGGER.info ("Creating new user with username '{}'", getCurrentUsername());

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

        return ResponseEntity.ok(createdUser);
    }

    @Override
    public ResponseEntity<?> getCurrentUserData() {
        LOGGER.debug("Getting user details of user with username '{}'", getCurrentUsername());

        return Optional.ofNullable(userRepository.findUserByUserId(getCurrentUserId()))
                .map(foundUser -> ResponseEntity.ok().body(foundUser))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<?> updateCurrentUserDetails(UserDetailsChangeDTO updateAccountDTO) {
        LOGGER.debug("Updating user details of user with username '{}'", getCurrentUsername());

        User foundUser = userRepository.findUserByUserId(getCurrentUserId());
        if(foundUser == null)
            throw new UserNotFoundException();

        checkRequestAndUpdateData(foundUser, updateAccountDTO);
        userRepository.save(foundUser);

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
        return userRepository.
                findAllByAccountTypeEqualsAndDoctorInfoSpecializationContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                        AccountType.DOCTOR,search, search, search);
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
