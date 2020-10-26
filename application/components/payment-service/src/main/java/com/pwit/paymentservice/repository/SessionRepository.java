package com.pwit.paymentservice.repository;

import com.pwit.paymentservice.entity.SessionEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<SessionEntity, String> {
    boolean existsByStripeIdAndIsHandledTrue(String stripeId);
    SessionEntity findByStripeId(String stripeId);
}
