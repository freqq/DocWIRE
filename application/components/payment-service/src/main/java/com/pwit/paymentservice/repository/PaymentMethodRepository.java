package com.pwit.paymentservice.repository;

import com.pwit.paymentservice.entity.PaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMethodRepository extends MongoRepository<PaymentMethod, String> {
    List<PaymentMethod> findAllByIsEnabledTrue();
}
