package com.pwit.appointmentsservice.service.impl;

import com.pwit.appointmentsservice.dto.File;
import com.pwit.appointmentsservice.dto.request.UploadRequest;
import com.pwit.appointmentsservice.dto.response.FileResponse;
import com.pwit.appointmentsservice.exception.InvalidFilesException;
import com.pwit.appointmentsservice.repository.FilesRepository;
import com.pwit.appointmentsservice.service.FileStorageService;
import com.pwit.appointmentsservice.service.FilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FilesServiceImpl implements FilesService {

    private final FilesRepository filesRepository;
    private final FileStorageService fileStorageService;

    @Override
    public ResponseEntity<?> getListOfFilesForUser(String userId) {
        List<File> files = filesRepository.findAllByPatientId(userId);
        List<FileResponse> fileResponses = new ArrayList<>();

        for(File file : files) {
            FileResponse fileResponse = new FileResponse().toBuilder()
                    .name(file.getName())
                    .id(file.getId())
                    .build();
            fileResponses.add(fileResponse);
        }

        return ResponseEntity.ok(fileResponses);
    }

    @Override
    public ResponseEntity<?> addFilesToAppointment(List<MultipartFile> files, UploadRequest uploadRequest) {
        List<String> fileNames = new ArrayList<>();

        try {
            fileStorageService.validateFiles(files);
        } catch (InvalidFilesException e) {
            return ResponseEntity.badRequest().build();
        }

        for(MultipartFile multipartFile : files) {
            try {
                File file = new File().toBuilder()
                        .appointmentId(uploadRequest.getAppointmentId())
                        .name(multipartFile.getOriginalFilename())
                        .content(multipartFile.getBytes())
                        .patientId(uploadRequest.getPatientId())
                        .build();

                filesRepository.save(file);
                fileNames.add(file.getName());
            } catch (IOException exception) {
                throw new RuntimeException(exception);
            }
        }
        return ResponseEntity.ok(fileNames);
    }

    @Override
    public ResponseEntity<?> getFileWithId(String fileId) {
        Optional<File> foundFile = filesRepository.findById(fileId);

        if(foundFile.isEmpty())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(foundFile.get().getContent());
    }
}
