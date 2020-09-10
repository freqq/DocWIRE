package com.pwit.accountservice.repository;

import com.pwit.accountservice.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmailIgnoreCase(String email);
    User findByUsername(String username);
    User findUserById(String id);
    User findByPasswordResetKey(String passwordResetKey);
    User findByEmailAndEmailChangeKey(String email, String emailChangeKey);
}
