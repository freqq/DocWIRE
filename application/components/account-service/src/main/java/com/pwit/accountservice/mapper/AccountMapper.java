package com.pwit.accountservice.mapper;

import com.pwit.accountservice.dto.CreateAccountDTO;
import com.pwit.accountservice.dto.ReadAccountDTO;
import com.pwit.accountservice.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AccountMapper {
    public static User mapCreateUserDTOToAccountEntity(CreateAccountDTO dto, PasswordEncoder passwordEncoder) {
        dto.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );

        return User.builder()
                .username(dto.getUsername())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .build();
    }

    public static ReadAccountDTO mapAccountEntityToReadAccountDTO(User entity) {
        return ReadAccountDTO.builder()
                .username(entity.getUsername())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .email(entity.getEmail())
                .build();
    }
}
