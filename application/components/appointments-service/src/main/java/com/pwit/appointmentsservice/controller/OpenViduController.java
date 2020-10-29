package com.pwit.appointmentsservice.controller;

import com.pwit.appointmentsservice.dto.request.LeaveSessionRequest;
import com.pwit.appointmentsservice.dto.request.SessionRequest;
import com.pwit.appointmentsservice.service.OpenViduService;
import com.pwit.common.utils.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.pwit.common.security.Authorities.ROLE_USER;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/appointments/session")
public class OpenViduController {
    private static final Logger LOGGER = new Logger();

    private final OpenViduService openViduService;

    /**
     * Joining a call session and getting a token
     *
     * @param sessionRequest Body of session request
     */
    @Secured(ROLE_USER)
    @PostMapping("/join")
    public ResponseEntity<?> getToken(@RequestBody @Valid SessionRequest sessionRequest) {
        LOGGER.info("Getting a token from OpenVidu Server by user {} | Session name: {}.",
                getCurrentUsername(), sessionRequest.getSessionName());

        return openViduService.getToken(sessionRequest);
    }

    /**
     * Quiting ongoing call session
     *
     * @param leaveSessionRequest Body of leave session request
     */
    @Secured(ROLE_USER)
    @PostMapping("/leave")
    public ResponseEntity<?> removeUser(@RequestBody LeaveSessionRequest leaveSessionRequest) {
        LOGGER.info("Removing a user {} from session | Session name: {}.",
                getCurrentUsername(), leaveSessionRequest.getSessionName());

        return openViduService.removeUser(leaveSessionRequest);
    }

}
