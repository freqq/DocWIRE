package com.pwit.notificationsservice.feign;

import com.pwit.notificationsservice.dto.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "account-service-svc",
        url = "https://account-service-svc:8445",
        configuration = FeignConfiguration.class,
        fallback = UserServiceFallback.class
)
public interface UserService {
    @GetMapping("/api/users/details/short/{userId}")
    User getDetailsOfUserWithGivenId(@PathVariable("userId") String userId);
}
