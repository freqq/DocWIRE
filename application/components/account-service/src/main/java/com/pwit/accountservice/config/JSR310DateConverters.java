package com.pwit.accountservice.config;

import org.springframework.core.convert.converter.Converter;

import java.time.*;
import java.util.Date;

public class JSR310DateConverters {
    static class LocalDateToDateConverter implements Converter<LocalDate, Date> {
        static LocalDateToDateConverter INSTANCE = new LocalDateToDateConverter();
        @Override
        public Date convert(LocalDate source) {
            return Date.from(source.atStartOfDay(ZoneId.systemDefault()).toInstant());
        }
    }

    static class DateToLocalDateConverter implements Converter<Date, LocalDate> {
        static DateToLocalDateConverter INSTANCE = new DateToLocalDateConverter();
        @Override
        public LocalDate convert(Date source){
            return ZonedDateTime.ofInstant(source.toInstant(), ZoneId.systemDefault()).toLocalDate();
        }
    }

    static class ZonedDateTimeToDateConverter implements Converter<ZonedDateTime, Date> {
        static ZonedDateTimeToDateConverter INSTANCE = new ZonedDateTimeToDateConverter();
        @Override
        public Date convert(ZonedDateTime source) {
            return Date.from(source.toInstant());
        }
    }

    static class DateToZonedDateTimeConverter implements Converter<Date, ZonedDateTime> {
        static DateToZonedDateTimeConverter INSTANCE = new DateToZonedDateTimeConverter();
        @Override
        public ZonedDateTime convert(Date source) {
            return ZonedDateTime.ofInstant(source.toInstant(), ZoneId.systemDefault());
        }
    }

    static class LocalDateTimeToDateConverter implements Converter<LocalDateTime, Date> {
        static LocalDateTimeToDateConverter INSTANCE = new LocalDateTimeToDateConverter();
        @Override
        public Date convert(LocalDateTime source) {
            return Date.from(source.atZone(ZoneId.systemDefault()).toInstant());
        }
    }

    static class DateToLocalDateTimeConverter implements Converter<Date, LocalDateTime> {
        static DateToLocalDateTimeConverter INSTANCE = new DateToLocalDateTimeConverter();
        @Override
        public LocalDateTime convert(Date source) {
            return LocalDateTime.ofInstant(source.toInstant(), ZoneId.systemDefault());
        }
    }

    static class DurationToLongConverter implements Converter<Duration, Long> {
        static DurationToLongConverter INSTANCE = new DurationToLongConverter();
        @Override
        public Long convert(Duration source) {
            return source.toNanos();
        }
    }

    static class LongToDurationConverter implements Converter<Long, Duration> {
        static LongToDurationConverter INSTANCE = new LongToDurationConverter();
        @Override
        public Duration convert(Long source) {
            return Duration.ofNanos(source);
        }
    }
}
