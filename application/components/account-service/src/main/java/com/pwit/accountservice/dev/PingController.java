package com.pwit.accountservice.dev;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.pwit.common.Constants.PROFILE_DEV;

@Profile(PROFILE_DEV)
@RestController
@RequestMapping("/api/users/ping")
public class PingController {
    @GetMapping
    public String getPong() {
        return "pong";
    }
}
