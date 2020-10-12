package com.pwit.accountservice.repository;

import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.entity.enumeration.AccountType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findUserByUserId(String userId);
    List<User> findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName,
                                                                                    String lastName);
    List<User> findByAccountTypeEqualsAndDoctorInfoSpecializationContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(AccountType accountType, String doctorInfoSpecialization, String firstName, String lastName);
    List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseAndUserIdNotContaining(String firstName, String lastName, String userId);
}
