package com.pwit.accountservice.service.util;

import org.apache.commons.lang3.RandomStringUtils;
import java.security.SecureRandom;

public class RandomUtil {
    private static final int DEF_COUNT = 20;
    private static final int DEF_KEY_COUNT = 64;
    private static final int BCRYPT_HASH_LENGTH = 64;

    private SecureRandom secureRandom() {
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(new byte[BCRYPT_HASH_LENGTH]);
        return secureRandom;
    }

    private static String generateRandomKey() {
        return RandomStringUtils
                .random(DEF_KEY_COUNT, 0, 0, true, true, null, secureRandom());
    }

    private String generateRandomAlphanumericString() {
        return RandomStringUtils
                .random(DEF_COUNT, 0, 0, true, true, null, secureRandom());
    }

    public String generatePassword() {
        return generateRandomAlphanumericString();
    }

    public static String generateResetKey() {
        return generateRandomKey();
    }
}
