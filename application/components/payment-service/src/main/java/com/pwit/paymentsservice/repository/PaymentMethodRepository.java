package com.pwit.paymentsservice.repository;

import com.pwit.paymentsservice.entity.PaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentMethodRepository extends MongoRepository<PaymentMethod, String> {
    List<PaymentMethod> findAllByIsEnabledTrue();
}
