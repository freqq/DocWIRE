package com.pwit.accountservice.feign;

import com.pwit.accountservice.entity.RecentAppointmentShort;

import java.util.ArrayList;
import java.util.List;

public class AppointmentsServiceFallback implements AppointmentsService {
    @Override
    public List<RecentAppointmentShort> getAllAppointmentsForCurrentUser() {
        return new ArrayList<>();
    }
}
