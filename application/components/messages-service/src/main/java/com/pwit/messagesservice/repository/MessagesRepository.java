package com.pwit.messagesservice.repository;

import com.pwit.messagesservice.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessagesRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllBySenderUserIdEqualsAndReceiverUserIdEquals(String senderUserId, String receiverUserId);
    List<ChatMessage> findAllByReceiverUserIdEqualsOrSenderUserIdEqualsOrderByDateTimeDesc(
            String receiverUserId, String senderUserId);
    Boolean existsByIdNotNullAndReadEqualsAndReceiverUserIdEquals(boolean read, String receiverUserId);
    Integer countAllByIdNotNullAndReceiverUserIdEqualsAndReadEquals(String receiverUserId, boolean read);
    List<ChatMessage> findAllByIdNotNullAndReceiverUserIdEqualsAndSenderUserIdEqualsAndReadEquals(
            String receiverUserId, String senderUserId, boolean read);
}
