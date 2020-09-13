package com.pwit.messagesservice.service.impl;

import com.pwit.messagesservice.entity.ChatMessage;
import com.pwit.messagesservice.entity.ChatType;
import com.pwit.messagesservice.entity.requests.ChatMessageItem;
import com.pwit.messagesservice.entity.requests.ChatMessageRequest;
import com.pwit.messagesservice.mapper.MessagesMapper;
import com.pwit.messagesservice.repository.MessagesRepository;
import com.pwit.messagesservice.service.MessagesService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@Service
@RequiredArgsConstructor
public class MessagesServiceImpl implements MessagesService {
    private final MessagesRepository messagesRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessagesMapper messagesMapper;

    @Override
    public ChatMessage sendPrivateMessage(ChatMessageRequest chatMessageRequest) {
        ChatMessage chatMessage = messagesMapper.createRequestToChatMessage(chatMessageRequest);

        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getReceiver().trim(), "/reply", chatMessage);

        if(chatMessage.getType() == ChatType.TYPING || chatMessage.getType() == ChatType.STOP_TYPING) {
            return null;
        }

        return messagesRepository.save(chatMessage);
    }

    @Override
    public List<ChatMessage> getChatHistoryWithUser(String username) {
        return Stream.of(
                messagesRepository.findAllBySenderEqualsAndReceiverEquals(getCurrentUsername(), username),
                messagesRepository.findAllBySenderEqualsAndReceiverEquals(username, getCurrentUsername()))
                .flatMap(Collection::stream)
                .sorted(Comparator.comparing(ChatMessage::getDateTime)).collect(Collectors.toList());
    }

    @Override
    public Integer countUnreadMessages() {
        return messagesRepository.countAllByIdNotNullAndReceiverEqualsAndReadEquals(getCurrentUsername(), false);
    }

    @Override
    public List<ChatMessage> markMessagesWithUserAsRead(String username) {
        List<ChatMessage> foundMessages = messagesRepository
                .findAllByIdNotNullAndReceiverEqualsAndSenderEqualsAndReadEquals(
                        getCurrentUsername(), username, false);

        foundMessages.forEach(chatMessage -> {
            chatMessage.setRead(true);
            messagesRepository.save((chatMessage));
        });

        return foundMessages;
    }

    @Override
    public List<ChatMessageItem> getMessagesList() {
        List<ChatMessage> messagesList =
                messagesRepository.findAllByReceiverEqualsOrSenderEqualsOrderByDateTimeDesc(
                        getCurrentUsername(), getCurrentUsername());

        List<ChatMessage> filteredList = messagesList.stream()
                .filter(distinctByKeys(ChatMessage::getReceiver, ChatMessage::getSender))
                .collect(Collectors.toList());

        List<ChatMessage> toDelete = new ArrayList<>();

        for (ChatMessage message : filteredList) {
            for (ChatMessage messageInner : filteredList) {
                if (message.getSender().equals(messageInner.getReceiver())
                        && message.getReceiver().equals(messageInner.getSender())) {
                    if (message.getDateTime().isBefore(messageInner.getDateTime())) {
                        toDelete.add(message);
                    } else if (messageInner.getDateTime().isBefore(message.getDateTime())) {
                        toDelete.add(messageInner);
                    }
                }
            }
        }

        filteredList.removeAll(toDelete);

        for (ChatMessage message : filteredList) {
            if(message.getSender().equals(getCurrentUsername())) {
                message.setSender(message.getReceiver());
            }
        }

        List<ChatMessageItem> returnList = new ArrayList<>();

        boolean anyMessageUnRead = messagesRepository.
                existsByIdNotNullAndReadEqualsAndReceiverEquals(false, getCurrentUsername());

        for(ChatMessage message : filteredList){
            returnList.add(new ChatMessageItem(
                    message.getId(),
                    message.getSender(),
                    message.getDateTime(),
                    message.getContent(),
                    anyMessageUnRead,
                    true
            ));
        }

        return returnList;
    }

    @SafeVarargs
    private static <T> Predicate<T> distinctByKeys(Function<? super T, ?>... keyExtractors) {
        final Map<List<?>, Boolean> seen = new ConcurrentHashMap<>();

        return t -> {
            final List<?> keys = Arrays.stream(keyExtractors)
                    .map(ke -> ke.apply(t))
                    .collect(Collectors.toList());

            return seen.putIfAbsent(keys, Boolean.TRUE) == null;
        };
    }
}
