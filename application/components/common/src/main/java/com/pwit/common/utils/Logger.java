package com.pwit.common.utils;

import org.slf4j.Marker;
import org.slf4j.spi.LocationAwareLogger;

import static org.slf4j.LoggerFactory.getLogger;

public class Logger {
    public static final String LOGGER_GLOBAL_ID = "logger";
    private static final String NAME = Logger.class.getName();

    private static final String MAIN = "main";

    private static final LocationAwareLogger internalLogger = (LocationAwareLogger) getLogger(MAIN);

    public void severe(String format, Object... arguments) {
        log(LoggerLevel.SEVERE.getMarker(), LocationAwareLogger.ERROR_INT, format, arguments);
    }

    public void error(String format, Object... arguments) {
        log(LoggerLevel.ERROR.getMarker(), LocationAwareLogger.ERROR_INT, format, arguments);
    }

    public void error(String format, Throwable ex, Object... arguments) {
        logError(LoggerLevel.ERROR.getMarker(), format, ex, arguments);
    }

    public void warn(String format, Object... arguments) {
        log(LoggerLevel.WARN.getMarker(), LocationAwareLogger.WARN_INT, format, arguments);
    }

    public void info(String format, Object... arguments) {
        log(LoggerLevel.INFO.getMarker(), LocationAwareLogger.INFO_INT, format, arguments);
    }

    public void debug(String format, Object... arguments) {
        log(LoggerLevel.DEBUG.getMarker(), LocationAwareLogger.INFO_INT, format, arguments);
    }

    private void log(Marker marker, int severity, String format, Object[] arguments) {
        internalLogger.log(marker, NAME, severity, format, arguments, null);
    }

    private void logError(Marker marker, String format, Throwable ex, Object[] arguments) {
        internalLogger.log(marker, NAME, LocationAwareLogger.ERROR_INT, format, arguments, ex);
    }
}
