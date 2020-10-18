package com.pwit.paymentsservice.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "payment")
@ConstructorBinding
@Data
public class PaymentProperties {
    private String stripeApiKey;
    private String callbackUrl;
    private String webhookUri;
    private String webhookSecret;
}
