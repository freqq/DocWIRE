package com.pwit.paymentservice.repository;

import com.pwit.paymentservice.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findAllByPatientId(String patientId);
    Payment findTopByPatientIdOrderByPaidAt(String patientId);
}
