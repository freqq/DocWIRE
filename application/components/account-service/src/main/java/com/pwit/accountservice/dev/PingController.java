package com.pwit.accountservice.dev;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import static com.pwit.common.Constants.PROFILE_DEV;

@Profile(PROFILE_DEV)
@RestController
@RequestMapping("/api/ping")
public class PingController {
    @GetMapping
    public String getPong() {
        return "pong";
    }
}
