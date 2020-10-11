package com.pwit.notificationsservice.configuration;

import com.pwit.common.utils.Logger;
import com.pwit.notificationsservice.dto.user.User;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;

@Component
@AllArgsConstructor
public class WebSocketEventListener {
    private static final Logger LOGGER = new Logger();

    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        LOGGER.info("Received a new web socket connection from user '{}'",
                Objects.requireNonNull(event.getUser()).getName());
    }
}