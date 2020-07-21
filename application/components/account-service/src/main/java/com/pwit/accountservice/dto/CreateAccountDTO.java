package com.pwit.accountservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAccountDTO {
    @NotBlank
    @Size(min = 3, max = 16)
    private String username;

    @NotBlank
    @Size(min = 3, max = 12)
    private String firstName;

    @Size(max = 32)
    private String lastName;

    @NotBlank
    @Size(min = 4)
    private String password;

    @NotBlank
    @Email
    private String email;
}