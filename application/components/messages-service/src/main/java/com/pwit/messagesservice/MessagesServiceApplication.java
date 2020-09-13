package com.pwit.messagesservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.pwit.common.security.AuthorityMapper;
import com.pwit.common.security.KeycloakResolverConfig;
import com.pwit.common.security.SecurityConfiguration;
import com.pwit.common.security.WebMvcConfig;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@ComponentScan({"com.pwit.common"})
@Import({
		AuthorityMapper.class,
		KeycloakResolverConfig.class,
		SecurityConfiguration.class,
		WebMvcConfig.class,
})
@EnableSwagger2
public class MessagesServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(MessagesServiceApplication.class, args);
	}
}
