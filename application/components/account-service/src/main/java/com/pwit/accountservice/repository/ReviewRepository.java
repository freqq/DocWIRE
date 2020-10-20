package com.pwit.accountservice.repository;

import com.pwit.accountservice.dto.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findAllByDoctorIdOrderByDateOfReview(String doctorId);
}
