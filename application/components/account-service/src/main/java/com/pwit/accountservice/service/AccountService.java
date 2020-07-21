package com.pwit.accountservice.service;

import com.pwit.accountservice.dto.CreateAccountDTO;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface AccountService {
    ResponseEntity<?> createAccount(CreateAccountDTO createAccountDTO);
    ResponseEntity<?> getAccountInfoByPrincipal(Principal principal);
}
