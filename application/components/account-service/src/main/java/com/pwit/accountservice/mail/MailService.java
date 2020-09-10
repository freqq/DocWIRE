package com.pwit.accountservice.mail;

import com.pwit.accountservice.entity.User;
import com.pwit.accountservice.utils.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class MailService {
    private static final Logger LOGGER = new Logger();

    private static final String USER = "user";
    private static final String BASE_URL = "baseUrl";

    private final MailProperties mailProperties;
    private final JavaMailSender javaMailSender;
    private final MessageSource messageSource;
    private final SpringTemplateEngine springTemplateEngine;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String mailFrom;

    @Async
    void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml){
        LOGGER.debug("Sending email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
                isMultipart, isHtml, to, subject, content);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper =
                    new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setFrom(mailFrom);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(content);

            javaMailSender.send(mimeMessage);

            LOGGER.debug("Sent email to user '{}'", to);

        } catch(MessagingException messagingException) {
            LOGGER.warn("Email could not be sent to user {}", to, messagingException);
        }
    }

    @Async
    void sendEmailFromTemplate(User user, String templateName, String titleKey) {
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, mailProperties.getBaseUrl());

        String content = springTemplateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);

        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    public void sendPasswordResetMail(User user) {
        LOGGER.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }

    @Async
    public void sendPasswordChangedInfoMail(User user) {
        LOGGER.debug("Sending password changed info email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordChangedEmail", "email.password.title");
    }

    @Async
    public void sendEmailChangeMail(User user, String email) {
        LOGGER.debug("Sending email changing email to '{}'", email);
        User toBeUser = user.toBuilder().email(email).build();
        sendEmailFromTemplate(user, "mail/emailChangeEmail", "email.change.title");
    }
}
