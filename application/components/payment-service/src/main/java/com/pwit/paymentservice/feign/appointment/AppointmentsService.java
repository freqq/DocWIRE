package com.pwit.paymentservice.feign.appointment;

import com.pwit.paymentservice.dto.response.RecentAppointment;
import com.pwit.paymentservice.feign.FeignConfiguration;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(
        name = "appointments-service-svc",
        url = "https://appointments-service-svc:8444",
        configuration = FeignConfiguration.class,
        fallback = AppointmentsServiceFallback.class
)
public interface AppointmentsService {
    @PutMapping("/api/appointments/paid/{appointmentId}")
    ResponseEntity<?> setAppointmentsStateToPaid(@PathVariable String appointmentId);

    @GetMapping("/api/appointments/{appointmentId}")
    RecentAppointment getAppointmentDetails(@PathVariable("appointmentId") String appointmentId);
}
