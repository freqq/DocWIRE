package com.pwit.messagesservice.mapper;

import com.pwit.messagesservice.entity.ChatMessage;
import com.pwit.messagesservice.entity.requests.ChatMessageRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MessagesMapper {
    MessagesMapper INSTANCE = Mappers.getMapper(MessagesMapper.class);

    ChatMessage createRequestToChatMessage(ChatMessageRequest request);
}
