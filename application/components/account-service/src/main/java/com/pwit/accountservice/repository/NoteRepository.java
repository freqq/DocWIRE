package com.pwit.accountservice.repository;

import com.pwit.accountservice.dto.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findAllByPatientIdOrderByDateOfNote(String patientId);
}