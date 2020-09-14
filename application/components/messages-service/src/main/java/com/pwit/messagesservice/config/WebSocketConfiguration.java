package com.pwit.messagesservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/chat/ws").setAllowedOrigins("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // TODO Remove next line when RabbitMQ enabled
        registry.enableSimpleBroker("/queue/", "/topic/", "/user/", "/notify");

        registry.setApplicationDestinationPrefixes("/app");

        //  TODO: Uncomment next block of code after enabling RabbitMQ
        /*registry.enableStompBrokerRelay("/topic")
                .setRelayHost("rabbitmq")
                .setRelayPort(61613)
                .setClientLogin("admin")
                .setClientPasscode("password")
                .setSystemLogin("admin")
                .setSystemPasscode("password");
         */

        registry.setUserDestinationPrefix("/user");
    }
}
