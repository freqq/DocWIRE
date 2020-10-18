package com.pwit.paymentsservice.repository;

import com.pwit.paymentsservice.entity.PaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMethodRepository extends MongoRepository<PaymentMethod, String> {
    List<PaymentMethod> findAllByIsEnabledTrue();
}
