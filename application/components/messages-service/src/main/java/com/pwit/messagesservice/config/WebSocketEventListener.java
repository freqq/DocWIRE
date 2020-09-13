package com.pwit.messagesservice.config;

import com.pwit.messagesservice.entity.ChatMessage;
import com.pwit.messagesservice.entity.ChatType;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@AllArgsConstructor
public class WebSocketEventListener {
    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        // TODO Add current username
        System.out.println("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String privateUsername = (String) headerAccessor.getSessionAttributes().get("private-username");
        if(username != null) {
            System.out.println("User Disconnected : " + username);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatType.LEAVE);
            chatMessage.setSender(username);

            messagingTemplate.convertAndSend("/topic/pubic", chatMessage);
        }

        if(privateUsername != null) {
            System.out.println("User Disconnected : " + privateUsername);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatType.LEAVE);
            chatMessage.setSender(privateUsername);

            messagingTemplate.convertAndSend("/queue/reply", chatMessage);
        }
    }
}
