package com.pwit.accountservice.feign;

import com.pwit.accountservice.dto.response.FileObject;
import com.pwit.accountservice.entity.RecentAppointmentShort;
import com.pwit.accountservice.entity.Review;

import java.util.ArrayList;
import java.util.List;

public class AppointmentsServiceFallback implements AppointmentsService {
    @Override
    public List<RecentAppointmentShort> getAllAppointmentsForCurrentUser() {
        return new ArrayList<>();
    }

    @Override
    public List<Review> getAllReviewsForCurrentUser(String userId) {
        return new ArrayList<>();
    }

    @Override
    public List<FileObject> getListOfFilesForUser(String userId) {
        return null;
    }
}
