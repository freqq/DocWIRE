package com.pwit.accountservice.repository;

import com.pwit.accountservice.entity.AuthorityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends JpaRepository<AuthorityEntity, Long> {
    List<AuthorityEntity> findByAccountId(Long id);
}