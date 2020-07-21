package com.pwit.accountservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReadAccountDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}
