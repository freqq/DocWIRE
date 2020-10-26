package com.pwit.paymentservice.feign;

import com.pwit.paymentservice.dto.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceFallback implements UserService {
    @Override
    public User getDetailsOfUserWithGivenId(String userId) {
        return null;
    }
}
