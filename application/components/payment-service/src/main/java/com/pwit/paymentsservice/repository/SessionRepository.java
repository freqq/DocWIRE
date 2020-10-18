package com.pwit.paymentsservice.repository;

import com.pwit.paymentsservice.entity.SessionEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<SessionEntity, String> {
    boolean existsByStripeIdAndHandledTrue(String stripeId);
    SessionEntity findByStripeId(String stripeId);
}
