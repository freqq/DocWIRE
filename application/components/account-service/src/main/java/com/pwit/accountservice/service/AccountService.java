package com.pwit.accountservice.service;

import com.pwit.accountservice.dto.UserDetailsChangeDTO;
import com.pwit.accountservice.dto.request.RegisterRequest;
import com.pwit.accountservice.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountService {
    ResponseEntity<?> createAccount(RegisterRequest registerRequest);
    ResponseEntity<?> getCurrentUserData();
    ResponseEntity<?> updateCurrentUserDetails(UserDetailsChangeDTO userDetailsChangeDTO);
    List<User> getAllUsersFilteredByFirstNameOrLastName(String search, Integer firstResult, Integer maxResults);
}
