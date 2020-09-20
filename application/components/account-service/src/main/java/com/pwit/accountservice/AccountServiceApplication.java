package com.pwit.accountservice;

import com.pwit.common.config.DatabaseConfiguration;
import com.pwit.common.config.SwaggerConfiguration;
import com.pwit.common.security.AuthorityMapper;
import com.pwit.common.security.KeycloakResolverConfig;
import com.pwit.common.security.SecurityConfiguration;
import com.pwit.common.security.WebMvcConfig;
import com.pwit.common.utils.Health;
import com.pwit.common.utils.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
@Import({
        AuthorityMapper.class,
        KeycloakResolverConfig.class,
        SecurityConfiguration.class,
        WebMvcConfig.class,
        DatabaseConfiguration.class,
        SwaggerConfiguration.class,
        Health.class
})
@EnableSwagger2
public class AccountServiceApplication {
    private static final Logger LOGGER = new Logger();

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(AccountServiceApplication.class);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = "http";

        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }

        String serverPort = env.getProperty("server.port");
        String contextPath = env.getProperty("server.servlet.context-path");

        if (contextPath == null || contextPath.isBlank()) {
            contextPath = "/";
        }

        String hostAddress = "localhost";

        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            LOGGER.warn("The host name could not be determined, using `localhost` as fallback");
        }

        LOGGER.info("\n----------------------------------------------------------\n\t" +
                        "Application '{}' is running! Access URLs:\n\t" +
                        "Local: \t\t{}://localhost:{}{}\n\t" +
                        "External: \t{}://{}:{}{}\n\t" +
                        "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                protocol,
                serverPort,
                contextPath,
                protocol,
                hostAddress,
                serverPort,
                contextPath,
                env.getActiveProfiles());
    }
}
