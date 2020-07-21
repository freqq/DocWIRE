package com.pwit.accountservice.rest;

import com.pwit.accountservice.dto.CreateAccountDTO;
import com.pwit.accountservice.service.AccountService;
import com.pwit.accountservice.utils.Logger;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@AllArgsConstructor
@RestController
@RequestMapping("users")
public class AccountController {
    private static final Logger LOGGER = new Logger();

    private final AccountService accountService;

    /**
     * Creates a new user account.
     *
     * @param createAccountDTO   Model of a new user request
     */
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> signUp(@RequestBody @Valid CreateAccountDTO createAccountDTO) {
        LOGGER.info("Creating new user with username {}.", createAccountDTO.getUsername());
        return accountService.createAccount(createAccountDTO);
    }

    /**
     * Creates a new user account.
     *
     * @param principal   Principal currently logged user
     */
    @Secured("ROLE_USER")
    @GetMapping(value = "/info", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> getAccountInfoByPrincipal(Principal principal) {
        LOGGER.info("Getting info of user with username {}.", principal.getName());
        return accountService.getAccountInfoByPrincipal(principal);
    }
}
