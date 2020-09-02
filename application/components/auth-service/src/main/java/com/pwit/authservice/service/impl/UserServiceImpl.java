package com.pwit.authservice.service.impl;

import com.pwit.authservice.dto.User;
import com.pwit.authservice.repository.UserRepository;
import com.pwit.authservice.service.UserService;
import com.pwit.authservice.utils.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = new Logger();
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository repository;

    @Override
    public void create(User user) {

        Optional<User> existing = repository.findById(user.getUsername());
        existing.ifPresent(it-> {throw new IllegalArgumentException("User already exists: " + it.getUsername());});

        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);

        repository.save(user);

        LOGGER.info("New user has been created: {}", user.getUsername());
    }
}
