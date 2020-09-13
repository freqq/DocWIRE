package com.pwit.common.utils;

import ch.qos.logback.classic.Level;
import com.google.common.collect.ImmutableMap;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;

import java.util.Map;

public enum LoggerLevel {
    SEVERE,
    ERROR,
    WARN,
    INFO,
    DEBUG;

    private static final Map<Level, Marker> levelToMarker = ImmutableMap.of(
            Level.TRACE, LoggerLevel.DEBUG.getMarker(),
            Level.DEBUG, LoggerLevel.DEBUG.getMarker(),
            Level.INFO, LoggerLevel.INFO.getMarker(),
            Level.WARN, LoggerLevel.WARN.getMarker(),
            Level.ERROR, LoggerLevel.ERROR.getMarker());

    public static Marker getLevelMarker(Level level) {
        return levelToMarker.get(level);
    }

    public Marker getMarker() {
        return MarkerFactory.getMarker(name());
    }
}
