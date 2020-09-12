package com.pwit.accountservice.repository;

import com.pwit.accountservice.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserByUserId(String userId);
}
