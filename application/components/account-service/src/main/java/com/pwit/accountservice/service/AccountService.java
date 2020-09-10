package com.pwit.accountservice.service;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.EmailChangeRequest;
import com.pwit.accountservice.dto.request.PasswordResetEndRequest;
import com.pwit.accountservice.dto.request.PasswordResetRequest;
import com.pwit.accountservice.dto.request.RegisterRequest;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface AccountService {
    ResponseEntity<?> createAccount(RegisterRequest registerRequest);
    ResponseEntity<?> getCurrentUserData(Principal principal);
    ResponseEntity<?> updateCurrentUserDetails(Principal principal, UserDetailsChangeDTO userDetailsChangeDTO);
    ResponseEntity<?> startUpdateCurrentUserEmail(Principal principal, EmailChangeRequest emailChangeRequest);
    ResponseEntity<?> finalizeUpdateCurrentUserEmail(Principal principal, String key);
    ResponseEntity<?> startResetCurrentPassword(Principal principal, PasswordResetRequest passwordResetRequest);
    ResponseEntity<?> finalizeResetCurrentPassword(Principal principal, PasswordResetEndRequest passwordResetEndRequest);
}
