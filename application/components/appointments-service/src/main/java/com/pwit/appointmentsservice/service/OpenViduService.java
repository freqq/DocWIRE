package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.dto.LeaveSessionRequest;
import com.pwit.appointmentsservice.dto.SessionRequest;
import org.springframework.http.ResponseEntity;

public interface OpenViduService {
    ResponseEntity<?> getToken(SessionRequest sessionRequest);
    ResponseEntity<?> removeUser(LeaveSessionRequest leaveSessionRequest);
}
