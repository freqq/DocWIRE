package com.pwit.accountservice.service.impl;

import com.pwit.accountservice.dto.CreateAccountDTO;
import com.pwit.accountservice.dto.ReadAccountDTO;
import com.pwit.accountservice.entity.AccountEntity;
import com.pwit.accountservice.entity.AuthorityEntity;
import com.pwit.accountservice.error.exception.EmailExistsException;
import com.pwit.accountservice.error.exception.UsernameExistsException;
import com.pwit.accountservice.mapper.AccountMapper;
import com.pwit.accountservice.repository.AccountRepository;
import com.pwit.accountservice.repository.AuthorityRepository;
import com.pwit.accountservice.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {
    private static final String ROLE_USER = "ROLE_USER";

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AccountRepository accountRepository;
    private final AuthorityRepository authorityRepository;

    @Override
    public ResponseEntity<?> createAccount(CreateAccountDTO createAccountDTO) {
        AccountEntity accountEntity = AccountMapper.mapCreateUserDTOToAccountEntity(createAccountDTO, bCryptPasswordEncoder);

        if (accountRepository.existsByUsername(accountEntity.getUsername())) {
            throw new UsernameExistsException();
        } else if (accountRepository.existsByEmail(accountEntity.getEmail())) {
            throw new EmailExistsException();
        }

        AccountEntity result = accountRepository.save(accountEntity);
        AuthorityEntity authority = AuthorityEntity.builder()
                .account(result)
                .authority(ROLE_USER)
                .build();
        authorityRepository.save(authority);


        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @Override
    public ResponseEntity<?> getAccountInfoByPrincipal(Principal principal) {
        if (principal == null)
            return ResponseEntity.notFound().build();

        Optional<AccountEntity> accountEntity = accountRepository.findByUsername(principal.getName());

        if (!accountEntity.isPresent())
            return ResponseEntity.notFound().build();

        ReadAccountDTO dto = AccountMapper.mapAccountEntityToReadAccountDTO(accountEntity.get());

        return ResponseEntity.ok(dto);
    }
}
