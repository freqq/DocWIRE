package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.dto.request.LeaveSessionRequest;
import com.pwit.appointmentsservice.dto.request.SessionRequest;
import org.springframework.http.ResponseEntity;

public interface OpenViduService {
    ResponseEntity<?> getToken(SessionRequest sessionRequest);
    ResponseEntity<?> removeUser(LeaveSessionRequest leaveSessionRequest);
}
