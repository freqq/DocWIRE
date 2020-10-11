package com.pwit.appointmentsservice.service.impl;

import com.pwit.appointmentsservice.dto.request.LeaveSessionRequest;
import com.pwit.appointmentsservice.dto.request.SessionRequest;
import com.pwit.appointmentsservice.service.OpenViduService;
import com.pwit.common.utils.Logger;
import io.openvidu.java.client.*;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@Service
public class OpenViduServiceImpl implements OpenViduService {
    private static final Logger LOGGER = new Logger();

    private OpenVidu openVidu;
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

    public OpenViduServiceImpl(@Value("${openvidu.secret}") String secret,
                               @Value("${openvidu.url}") String openViduUrl) {
        this.openVidu = new OpenVidu(openViduUrl, secret);
    }

    @Override
    public ResponseEntity<?> getToken(SessionRequest sessionRequest) {
        String sessionName = sessionRequest.getSessionName();
        OpenViduRole role = sessionRequest.getRole();
        String serverData = "{\"serverData\": \"" + sessionRequest.getUsername() + "\"}";

        TokenOptions tokenOptions = new TokenOptions.Builder().data(serverData).role(role).build();
        JSONObject responseJson = new JSONObject();

        if (this.mapSessions.get(sessionName) != null) {
            LOGGER.info("Existing session: " + sessionName);

            try {
                String token = this.mapSessions.get(sessionName).generateToken(tokenOptions);
                this.mapSessionNamesTokens.get(sessionName).put(token, role);
                responseJson.put(String.valueOf(0), token);

                return new ResponseEntity<>(responseJson, HttpStatus.OK);
            } catch (OpenViduJavaClientException e1) {
                return getErrorResponse(e1);
            } catch (OpenViduHttpException e2) {
                if (404 == e2.getStatus()) {
                    this.mapSessions.remove(sessionName);
                    this.mapSessionNamesTokens.remove(sessionName);
                }
            }
        }

        LOGGER.info("New session: " + sessionName);

        try {
            SessionProperties properties = new SessionProperties.Builder().build();
            Session session = this.openVidu.createSession(properties);
            String token = session.generateToken(tokenOptions);

            this.mapSessions.put(sessionName, session);
            this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
            this.mapSessionNamesTokens.get(sessionName).put(token, role);

            responseJson.put(String.valueOf(0), token);

            return new ResponseEntity<>(responseJson, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return getErrorResponse(e);
        }
    }

    @Override
    public ResponseEntity<?> removeUser(LeaveSessionRequest leaveSessionRequest) {
        String sessionName = leaveSessionRequest.getSessionName();
        String token = leaveSessionRequest.getToken();

        if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {
            if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
                if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
                    this.mapSessions.remove(sessionName);
                }

                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                LOGGER.error("Trying to leave session by user {}. Given token was not valid",
                        getCurrentUsername());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            LOGGER.error("Trying to leave session by user {}. Session with name {} does not exist.",
                    getCurrentUsername(), leaveSessionRequest.getSessionName());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<JSONObject> getErrorResponse(Exception e) {
        JSONObject json = new JSONObject();
        json.put("cause", e.getCause());
        json.put("error", e.getMessage());
        json.put("exception", e.getClass());
        return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
