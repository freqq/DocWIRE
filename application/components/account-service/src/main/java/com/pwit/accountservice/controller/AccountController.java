package com.pwit.accountservice.controller;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.*;
import com.pwit.accountservice.service.AccountService;
import com.pwit.accountservice.utils.Logger;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

import static com.pwit.accountservice.security.Authorities.ROLE_USER;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class AccountController {
    private static final Logger LOGGER = new Logger();

    private final AccountService accountService;

    /**
     * Creates a new user account.
     *
     * @param registerRequest      Model of a new user request
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> createAccount(@Valid @RequestBody RegisterRequest registerRequest) {
        LOGGER.info("Creating new user with username {}.", registerRequest.getUsername());
        return accountService.createAccount(registerRequest);
    }

    /**
     * Gets info about currently logged in user.
     *
     * @param principal             Principal currently logged user
     */
    @Secured(ROLE_USER)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getCurrentUserData(Principal principal) {
        LOGGER.info("Getting info of user with username {}.", principal.getName());
        return accountService.getCurrentUserData(principal);
    }

    /**
     * Update current user data.
     *
     * @param principal             Principal currently logged user
     * @param userDetailsChangeDTO      Update user request
     */
    @Secured(ROLE_USER)
    @PutMapping()
    ResponseEntity<?> updateCurrentUserDetails(Principal principal,
                                                @Valid @RequestBody UserDetailsChangeDTO userDetailsChangeDTO){
        LOGGER.info("Updating details of user with username {}", principal.getName());
        return accountService.updateCurrentUserDetails(principal, userDetailsChangeDTO);
    }

    /**
     * Start process of change of current email address.
     *
     * @param principal             Principal currently logged user
     * @param emailChangeRequest      Update user request
     */
    @Secured(ROLE_USER)
    @PostMapping("/email/change")
    ResponseEntity<?> startUpdateCurrentUserEmail(Principal principal,
                                                    @Valid @RequestBody EmailChangeRequest emailChangeRequest){
        LOGGER.info("Starting an update of email of user with username {} to new email {}",
                        principal.getName(), emailChangeRequest.getNewEmail());
        return accountService.startUpdateCurrentUserEmail(principal, emailChangeRequest);
    }

    /**
     * Finalizing process of change of current email address.
     *
     * @param principal             Principal currently logged user
     * @param key                   key sent to new email
     */
    @Secured(ROLE_USER)
    @PostMapping("/email/finalize-change")
    ResponseEntity<?> finalizeUpdateCurrentUserEmail(Principal principal, @RequestParam("key") String key){
        LOGGER.info("Finalizing an update of email of user with username {} to new email.", principal.getName());
        return accountService.finalizeUpdateCurrentUserEmail(principal, key);
    }

    /**
     * Starting process of change of current password.
     *
     * @param principal                Principal currently logged user
     * @param passwordResetRequest     required password reset request
     */
    @Secured(ROLE_USER)
    @PostMapping("/password/reset/start")
    ResponseEntity<?> startResetCurrentPassword(Principal principal, PasswordResetRequest passwordResetRequest){
        LOGGER.info("Starting a reset of password for user with username {}.", principal.getName());
        return accountService.startResetCurrentPassword(principal, passwordResetRequest);
    }

    /**
     * Finalizing process of change of current password.
     *
     * @param principal                   Principal currently logged user
     * @param passwordResetEndRequest     must contain valid reset key and valid new password
     */
    @Secured(ROLE_USER)
    @PostMapping("/password/reset/end")
    ResponseEntity<?> finalizeResetCurrentPassword(Principal principal, PasswordResetEndRequest passwordResetEndRequest){
        LOGGER.info("Finalizing a reset of password for user with username {}.", principal.getName());
        return accountService.finalizeResetCurrentPassword(principal, passwordResetEndRequest);
    }
}
