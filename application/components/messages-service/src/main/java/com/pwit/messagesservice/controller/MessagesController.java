package com.pwit.messagesservice.controller;

import com.pwit.messagesservice.entity.ChatMessage;
import com.pwit.messagesservice.entity.requests.ChatMessageItem;
import com.pwit.messagesservice.entity.requests.ChatMessageRequest;
import com.pwit.messagesservice.service.MessagesService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pwit.common.utils.Logger;

import java.util.List;

import static com.pwit.common.security.SecurityUtils.getCurrentUsername;
import static com.pwit.common.security.Authorities.ROLE_USER;

@AllArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class MessagesController {
    private static final Logger LOGGER = new Logger();

    private final MessagesService messagesService;

    @MessageMapping("/sendPrivateMessage")
    @Secured(ROLE_USER)
    public ChatMessage sendPrivateMessage(@Payload ChatMessageRequest chatMessageRequest) {
        LOGGER.info("Sending private message with content: {}.", chatMessageRequest.getContent());

        return messagesService.sendPrivateMessage(chatMessageRequest);
    }

    @GetMapping(value="/messages", produces = MediaType.APPLICATION_JSON_VALUE)
    @Secured(ROLE_USER)
    public List<ChatMessageItem> getMessagesList() {
        LOGGER.info("Getting messages list for user {}.", getCurrentUsername());

        return messagesService.getMessagesList();
    }

    @GetMapping(value="/history", produces = MediaType.APPLICATION_JSON_VALUE)
    @Secured(ROLE_USER)
    public List<ChatMessage> getChatHistoryWithUser(@RequestParam(value = "username") String username) {
        LOGGER.info("Getting chat history for users {} and {}.", username, getCurrentUsername());

        return messagesService.getChatHistoryWithUser(username);
    }

    @GetMapping(value="/count", produces = MediaType.APPLICATION_JSON_VALUE)
    @Secured(ROLE_USER)
    public Integer countUnreadMessages() {
        LOGGER.info("Counting unread messages by user {}.", getCurrentUsername());

        return messagesService.countUnreadMessages();
    }

    @GetMapping(value="/read", produces = MediaType.APPLICATION_JSON_VALUE)
    @Secured(ROLE_USER)
    public List<ChatMessage> markMessagesWithUserAsRead(@RequestParam(value = "username") String username) {
        LOGGER.info("Marking messages as read by user {} with user {}.", getCurrentUsername(), username);

        return messagesService.markMessagesWithUserAsRead(username);
    }
}
