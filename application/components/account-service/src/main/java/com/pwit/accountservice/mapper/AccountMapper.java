package com.pwit.accountservice.mapper;

import com.pwit.accountservice.dto.CreateAccountDTO;
import com.pwit.accountservice.dto.ReadAccountDTO;
import com.pwit.accountservice.entity.AccountEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AccountMapper {
    public static AccountEntity mapCreateUserDTOToAccountEntity(CreateAccountDTO dto, PasswordEncoder passwordEncoder) {
        dto.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );

        return AccountEntity.builder()
                .username(dto.getUsername())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .build();
    }

    public static ReadAccountDTO mapAccountEntityToReadAccountDTO(AccountEntity entity) {
        return ReadAccountDTO.builder()
                .username(entity.getUsername())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .email(entity.getEmail())
                .build();
    }
}
