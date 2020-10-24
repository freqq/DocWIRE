package com.pwit.appointmentsservice.repository;

import com.pwit.appointmentsservice.dto.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
}
