package com.pwit.accountservice.service.impl;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.EmailChangeRequest;
import com.pwit.accountservice.dto.request.PasswordResetEndRequest;
import com.pwit.accountservice.dto.request.PasswordResetRequest;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.entity.EmailChange;
import com.pwit.accountservice.entity.PasswordReset;
import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.error.exception.PasswordResetKeyWrongOrExpiredException;
import com.pwit.accountservice.error.exception.UserNotFoundException;
import com.pwit.accountservice.error.exception.WrongOrExpiredEmailChangeKeyException;
import com.pwit.accountservice.mail.MailService;
import com.pwit.accountservice.repository.UserRepository;
import com.pwit.accountservice.service.AccountService;
import com.pwit.accountservice.utils.Logger;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.pwit.accountservice.service.util.RandomUtil.generateResetKey;
import static com.pwit.accountservice.utils.Constants.EMAIL_CHANGE_VALID_FOR_HOURS;
import static com.pwit.accountservice.utils.Constants.RESET_KEY_VALID_FOR_HOURS;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {
    private static final Logger LOGGER = new Logger();

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final MailService mailService;

    @Override
    public ResponseEntity<?> createAccount(RegisterRequest registerRequest) {
        LOGGER.info ("Creating new user with username with username '{}'", registerRequest.getUsername());

        String encryptedPassword = passwordEncoder.encode(registerRequest.getPassword());

        User createdUser = new User().builder()
                .email(registerRequest.getEmail())
                .username(registerRequest.getUsername())
                .password(encryptedPassword)
                .langKey(registerRequest.getLangKey());

        userRepository.save(createdUser);

        LOGGER.info("Successfully created new user with username '{}'", createdUser.getUsername());

        return ResponseEntity.ok(createdUser);
    }

    @Override
    public ResponseEntity<?> getCurrentUserData(Principal principal) {
        LOGGER.debug("Getting user details of user with username '{}'", principal.getName());

        return Optional.ofNullable(userRepository.findByUsername(principal.getName()))
                .map(foundUser -> ResponseEntity.ok().body(foundUser))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<?> updateCurrentUserDetails(Principal principal, UserDetailsChangeDTO updateAccountDTO) {
        LOGGER.debug("Updating user details of user with username '{}'", principal.getName());

        User foundUser = userRepository.findByUsername(principal.getName());

        if(foundUser == null)
            throw new UserNotFoundException();

        // EDIT USER

        userRepository.save(foundUser);

        LOGGER.debug("Getting user details of user with username '{}'", principal.getName());

        return ResponseEntity.ok().body(foundUser);
    }

    @Override
    public ResponseEntity<?> startUpdateCurrentUserEmail(Principal principal, EmailChangeRequest emailChangeRequest) {
        LOGGER.debug("Staring an update of email of user with username '{}'", principal.getName());

        User foundUser = userRepository.findByUsername(principal.getName());

        if (foundUser == null)
            throw new UserNotFoundException();

        if (checkPassword(foundUser, emailChangeRequest.getPassword())){
            User existingEmail = userRepository.findByEmailIgnoreCase(emailChangeRequest.getNewEmail());

            if (existingEmail == null) {
                String key = generateResetKey();

                EmailChange emailChange = new EmailChange();
                emailChange.setKey(key);
                emailChange.setNewEmail(emailChangeRequest.getNewEmail());

                User updatedUser = foundUser.copy(emailChange = emailChange);
                userRepository.save(updatedUser);
                mailService.sendEmailChangeMail(updatedUser, emailChangeRequest.getNewEmail());

                LOGGER.debug("Successfully Started an update of email of user with username '{}'", principal.getName());

                return ResponseEntity.ok().build();
            }

            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.badRequest().build();
    }

    @Override
    public ResponseEntity<?> finalizeUpdateCurrentUserEmail(Principal principal, String key) {
        LOGGER.debug("Staring the finalization of the update of email of user with old email '{}'", principal.getName());

        User currentUser = userRepository.findByUsername(principal.getName());
        User foundUser = userRepository.findByEmailAndEmailChangeKey(currentUser.getEmail(), key);

        if (foundUser == null)
            throw new WrongOrExpiredEmailChangeKeyException("Given email reset key is wrong.");

        EmailChange emailChange = foundUser.getEmailChange();

        if(isExpired(emailChange)){
            User updateUser = foundUser.copy(emailChange = null);
            userRepository.save(updateUser);
            throw new WrongOrExpiredEmailChangeKeyException("Given email reset key is expired.");
        }

        User updatedUser = foundUser.copy(email = emailChange.getNewEmail(), emailChange = null);
        userRepository.save(updatedUser);

        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<?> startResetCurrentPassword(Principal principal,
                                                       PasswordResetRequest passwordResetRequest) {
        LOGGER.debug("Staring the process of reset of password for user with username '{}'", principal.getName());

        User foundUser = userRepository.findByUsername(principal.getName());

        if (foundUser == null)
            throw new UserNotFoundException();

        String resetKey = generateResetKey();
        PasswordReset passwordReset = new PasswordReset();
        passwordReset.setKey(resetKey);

        foundUser = userRepository.save(user.copy(passwordResetRequest = passwordReset));
        mailService.sendPasswordResetMail(foundUser);

        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<?> finalizeResetCurrentPassword(Principal principal,
                                                          PasswordResetEndRequest passwordResetEndRequest) {
        LOGGER.debug("Finalizing the process of reset of password for user with username '{}'", principal.getName());

        User foundUser = userRepository.findByPasswordResetKey(passwordResetEndRequest.getKey());

        if (foundUser == null)
            throw new PasswordResetKeyWrongOrExpiredException("Given reset key is wrong.");

        LocalDateTime nowMinusValidity = LocalDateTime.now().minusHours(RESET_KEY_VALID_FOR_HOURS);

        if(foundUser.getPasswordReset().getExpireAt().isBefore(nowMinusValidity)) {
            userRepository.save(foundUser.copy(passwordReset = null));
            throw new PasswordResetKeyWrongOrExpiredException("Given reset key expired.");
        }

        userRepository.save(foundUser.copy(
                password = passwordEncoder(passwordResetEndRequest.getNewPassword()),
                passwordReset = null));
        mailService.sendPasswordChangedInfoMail(foundUser);

        return ResponseEntity.ok().build();
    }

    private boolean checkPassword(User user, String password){
        return passwordEncoder.matches(password, user.getPassword());
    }

    private boolean isExpired(EmailChange token) {
        LocalDateTime tokenDate = token.getExpireAt();
        return tokenDate.isBefore(LocalDateTime.now().minusHours(EMAIL_CHANGE_VALID_FOR_HOURS));
    }
}
