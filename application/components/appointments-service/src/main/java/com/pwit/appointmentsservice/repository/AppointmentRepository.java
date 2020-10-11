package com.pwit.appointmentsservice.repository;

import com.pwit.appointmentsservice.dto.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {

}