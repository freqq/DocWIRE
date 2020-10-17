package com.pwit.paymentsservice.mapper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperBeans {
    @Bean
    public NotificationMapper notificationMapper() { return NotificationMapper.INSTANCE; }
}
