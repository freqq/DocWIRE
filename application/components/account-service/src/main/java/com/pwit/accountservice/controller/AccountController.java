package com.pwit.accountservice.controller;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.service.AccountService;
import com.pwit.common.utils.Logger;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.pwit.common.security.Authorities.ROLE_USER;
import static com.pwit.common.security.SecurityUtils.getCurrentUserEmail;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

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
        LOGGER.info("Creating new user with username {}.", getCurrentUsername());
        return accountService.createAccount(registerRequest);
    }

    /**
     * Gets info about currently logged in user.
     */
    @Secured(ROLE_USER)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getCurrentUserData() {
        LOGGER.info("Getting info of user with email '{}'.", getCurrentUserEmail());
        return accountService.getCurrentUserData();
    }

    /**
     * Update current user data.
     *
     * @param userDetailsChangeDTO      Update user request
     */
    @Secured(ROLE_USER)
    @PutMapping()
    ResponseEntity<?> updateCurrentUserDetails(@Valid @RequestBody UserDetailsChangeDTO userDetailsChangeDTO){
        LOGGER.info("Updating details of user with email '{}'", getCurrentUserEmail());
        return accountService.updateCurrentUserDetails(userDetailsChangeDTO);
    }

    /**
     * Returns list of accounts filtered with search query
     *
     * @param search         Search query
     * @param firstResult      Update user request
     * @param maxResults      Update user request
     */
    @GetMapping("/all")
    @Secured(ROLE_USER)
    List<User> getAllUsersFilteredByFirstNameOrLastName(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "first", defaultValue = "0") Integer firstResult,
            @RequestParam(value = "max", defaultValue = "15") Integer maxResults
    ) {
        LOGGER.info("Getting list of users filtered by serch query '{}' for user with email '{}'",
                search,
                getCurrentUserEmail());
        return accountService.getAllUsersFilteredByFirstNameOrLastName(search, firstResult, maxResults);
    }
}
