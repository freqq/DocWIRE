package com.pwit.messagesservice.mapper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperBeans {
    @Bean
    public MessagesMapper messagesMapper() {
        return MessagesMapper.INSTANCE;
    }
}
