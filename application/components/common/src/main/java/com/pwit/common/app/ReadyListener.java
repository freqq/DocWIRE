package com.pwit.common.app;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;

public class ReadyListener implements ApplicationListener {

    private static volatile boolean ready = false;

    public static void setReady() {
        ReadyListener.ready = true;
    }

    public static boolean isReady() {
        return ready;
    }

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        if (event instanceof ApplicationReadyEvent) {
            setReady();
        }
    }
}