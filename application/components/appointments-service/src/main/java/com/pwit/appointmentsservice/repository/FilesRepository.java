package com.pwit.appointmentsservice.repository;

import com.pwit.appointmentsservice.dto.File;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilesRepository extends MongoRepository<File, String> {
    List<File> findAllByPatientId(String patientId);
}
