package com.pwit.common.utils;

import com.pwit.common.app.ReadyListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class Health {
    @GetMapping
    ResponseEntity health() {
        if (!ReadyListener.isReady()) {
            return new ResponseEntity<>("{\"success\":\"DOWN\"}", HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity<>("{\"success\":\"UP\"}", HttpStatus.OK);
    }
}