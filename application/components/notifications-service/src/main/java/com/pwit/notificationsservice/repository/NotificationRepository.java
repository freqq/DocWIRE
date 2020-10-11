package com.pwit.notificationsservice.repository;

import com.pwit.notificationsservice.dto.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findAllByIdNotNullAndAuthorIdNotOrderByDateTimeDesc(String authorId);
    Boolean existsByIdNotNullAndReadFalseAndAuthorIdNot(String authorId);
}
