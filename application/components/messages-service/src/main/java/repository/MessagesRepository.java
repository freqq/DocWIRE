package repository;

import com.pwit.messagesservice.entity.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessagesRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllBySenderEqualsAndReceiverEquals(String sender, String receiver);
    List<ChatMessage> findAllByReceiverEqualsOrSenderEqualsOrderByDateTimeDesc(String receiver, String sender);
    Boolean existsByIdNotNullAndReadEqualsAndReceiverEquals(boolean read, String receiver);
    Integer countAllByIdNotNullAndReceiverEqualsAndReadEquals(String receiver, boolean read);
    List<ChatMessage> findAllByIdNotNullAndReceiverEqualsAndSenderEqualsAndReadEquals(
            String receiver, String sender, boolean read);
}
