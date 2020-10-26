package com.pwit.accountservice.feign;

import com.pwit.accountservice.dto.response.FileObject;
import com.pwit.accountservice.entity.RecentAppointmentShort;
import com.pwit.accountservice.entity.Review;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @GetMapping("/api/appointments/review/{userId}")
    List<Review> getAllReviewsForCurrentUser(@PathVariable("userId") String userId);

    @GetMapping("/api/appointments/files/user/{userId}")
    List<FileObject> getListOfFilesForUser(@PathVariable("userId") String userId);
}
