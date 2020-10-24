package com.pwit.accountservice.feign;

import com.pwit.accountservice.entity.RecentAppointmentShort;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(
        name = "appointments-service-svc",
        url = "https://appointments-service-svc:8444",
        configuration = FeignConfiguration.class,
        fallback = AppointmentsServiceFallback.class
)
public interface AppointmentsService {
    @GetMapping("/api/appointments/details/short")
    List<RecentAppointmentShort> getAllAppointmentsForCurrentUser();
}
