package com.pwit.accountservice.service;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.RegisterRequest;
import org.springframework.http.ResponseEntity;

public interface AccountService {
    ResponseEntity<?> createAccount(RegisterRequest registerRequest);
    ResponseEntity<?> getCurrentUserData();
    ResponseEntity<?> updateCurrentUserDetails(UserDetailsChangeDTO userDetailsChangeDTO);
}
