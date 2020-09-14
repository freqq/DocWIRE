package com.pwit.messagesservice.service;

import com.pwit.messagesservice.entity.ChatMessage;
import com.pwit.messagesservice.entity.requests.ChatMessageItem;
import com.pwit.messagesservice.entity.requests.ChatMessageRequest;

import java.util.List;

public interface MessagesService {
    ChatMessage sendPrivateMessage(ChatMessageRequest chatMessageRequest);
    List<ChatMessage> getChatHistoryWithUser(String currentUserId, String userId);
    List<ChatMessageItem> getMessagesList(String currentUserId);
    Integer countUnreadMessages(String currentUserId);
    List<ChatMessage> markMessagesWithUserAsRead(String currentUserId, String userId);
}
