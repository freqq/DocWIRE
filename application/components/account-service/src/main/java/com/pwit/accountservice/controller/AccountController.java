package com.pwit.accountservice.controller;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.NoteRequest;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.dto.request.ReviewRequest;
import com.pwit.accountservice.dto.response.PatientDetailsResponse;
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
import static com.pwit.common.security.SecurityUtils.*;

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
    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAccount(@Valid @RequestBody RegisterRequest registerRequest) {
        LOGGER.info("Creating new user with username {}.", getCurrentUsername());
        return accountService.createAccount(registerRequest);
    }

    /**
     * Gets info about currently logged in user.
     */
    @Secured(ROLE_USER)
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCurrentUserData() {
        LOGGER.info("Getting info of user with username '{}'.", getCurrentUsername());
        return accountService.getCurrentUserData();
    }

    /**
     * Gets info about user with given id.
     *
     * @param userId  Id of user to get data from
     */
    @Secured(ROLE_USER)
    @GetMapping(value = "/details/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PatientDetailsResponse> getDetailsOfUserWithGivenId(@PathVariable("userId") String userId) {
        LOGGER.info("Getting info of user with given id '{}'.", userId);
        return accountService.getDetailsOfUserWithGivenId(userId);
    }

    /**
     * Update current user data.
     *
     * @param userDetailsChangeDTO      Update user request
     */
    @Secured(ROLE_USER)
    @PutMapping(value = "/")
    public ResponseEntity<?> updateCurrentUserDetails(@Valid @RequestBody UserDetailsChangeDTO userDetailsChangeDTO){
        LOGGER.info("Updating details of user with username '{}'", getCurrentUsername());
        return accountService.updateCurrentUserDetails(userDetailsChangeDTO);
    }

    /**
     * Returns list of accounts filtered with search query
     *
     * @param search         Search query
     * @param firstResult      Update user request
     * @param maxResults      Update user request
     */
    @GetMapping(value = "/all")
    @Secured(ROLE_USER)
    public List<User> getAllUsersFilteredByFirstNameOrLastName(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "first", defaultValue = "0") Integer firstResult,
            @RequestParam(value = "max", defaultValue = "15") Integer maxResults
    ) {
        LOGGER.info("Getting list of users filtered by search query '{}' for user with username '{}'",
                search,
                getCurrentUsername());
        return accountService.getAllUsersFilteredByFirstNameOrLastName(search, firstResult, maxResults);
    }

    /**
     * Returns list of doctors filtered with search query
     *
     * @param search         Search query
     * @param firstResult      Update user request
     * @param maxResults      Update user request
     */
    @GetMapping(value = "/doctors")
    @Secured(ROLE_USER)
    public List<User> getListOfDoctorsFilteredBySearchFilter(
            @RequestParam(value="search", required = false) String search,
            @RequestParam(value = "first", defaultValue = "0") Integer firstResult,
            @RequestParam(value = "max", defaultValue = "15") Integer maxResults
    ) {
        LOGGER.info("Getting list of doctors filtered by search query '{}' for user with username '{}'",
                search,
                getCurrentUsername());
        return accountService.getListOfDoctorsFilteredBySearchFilter(search, firstResult, maxResults);
    }

    /**
     * Sets initial diagnose as done for current user.
     */
    @PutMapping("/diagnose")
    @Secured(ROLE_USER)
    public ResponseEntity<?> setInitialDiagnoseDone() {
        LOGGER.info("Setting initial diagnose done for user {}.", getCurrentUsername());
        return accountService.setInitialDiagnoseDone(getCurrentUserId());
    }

    /**
     * Creates a new note for chosen patient.
     */
    @Secured(ROLE_USER)
    @PostMapping("/note")
    public ResponseEntity<?> createNewNote(@RequestBody @Valid NoteRequest noteRequest) {
        LOGGER.info("Creating a new note for chosen patient by user {}.", getCurrentUsername());
        return accountService.createNewNote(noteRequest, getCurrentUserId());
    }

    /**
     * Creates a new review for chosen doctor.
     */
    @Secured(ROLE_USER)
    @PostMapping("/review")
    public ResponseEntity<?> createNewReview(@RequestBody @Valid ReviewRequest reviewRequest) {
        LOGGER.info("Creating a new review for chosen doctor by user {}.", getCurrentUsername());
        return accountService.createNewReview(reviewRequest, getCurrentUserId());
    }

    /**
     * Search for users with given first name or last name
     *
     * @param query   Search query value
     */
    @Secured(ROLE_USER)
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam(value = "query") String query) {
        LOGGER.info("Searching for users with given first name or last name by user {}.", getCurrentUsername());
        return accountService.searchUsers(query, getCurrentUserId());
    }
}
