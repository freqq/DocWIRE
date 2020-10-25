package com.pwit.appointmentsservice.repository;

import com.pwit.appointmentsservice.dto.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findAllByDoctorId(String doctorId);
}
