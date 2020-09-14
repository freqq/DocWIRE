package com.pwit.messagesservice.config;

import com.pwit.common.utils.Logger;
import com.pwit.messagesservice.entity.ChatMessage;
import com.pwit.messagesservice.entity.ChatType;
import com.pwit.messagesservice.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;

import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

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

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        User sender = (User) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("sender");
        if(sender != null) {
            LOGGER.info("User '{}' disconnected.", sender.getUserId());

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatType.LEAVE);
            chatMessage.setSender(sender);

            messagingTemplate.convertAndSend("/topic/pubic", chatMessage);
        }

        if(sender != null) {
            LOGGER.info("User '{}' disconnected.", sender.getUserId());

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatType.LEAVE);
            chatMessage.setSender(sender);

            messagingTemplate.convertAndSend("/queue/reply", chatMessage);
        }
    }
}
