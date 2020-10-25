package com.pwit.notificationsservice.repository;

import com.pwit.notificationsservice.entity.SessionEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<SessionEntity, String> {
    boolean existsByStripeIdAndIsHandledTrue(String stripeId);
    SessionEntity findByStripeId(String stripeId);
}
