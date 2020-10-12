package com.pwit.accountservice.dto.response;

import com.pwit.accountservice.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {
    List<User> doctors;
    List<User> patients;
}
