package com.pwit.appointmentsservice.repository;

import com.pwit.appointmentsservice.dto.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findAllByPatientId(String patientId);
    Appointment findTopByPatientId(String patientId);
    List<Appointment> findAllByDoctorId(String doctorId);
}