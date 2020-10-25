package com.pwit.notificationsservice.feign;

import com.pwit.notificationsservice.dto.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceFallback implements UserService {
    @Override
    public User getDetailsOfUserWithGivenId(String userId) {
        return null;
    }
}
