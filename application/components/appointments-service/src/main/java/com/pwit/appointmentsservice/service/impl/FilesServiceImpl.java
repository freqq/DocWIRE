package com.pwit.appointmentsservice.service.impl;

import com.pwit.appointmentsservice.dto.File;
import com.pwit.appointmentsservice.dto.request.UploadRequest;
import com.pwit.appointmentsservice.dto.response.FileResponse;
import com.pwit.appointmentsservice.repository.FilesRepository;
import com.pwit.appointmentsservice.service.FileStorageService;
import com.pwit.appointmentsservice.service.FilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilesServiceImpl implements FilesService {

    private final FilesRepository filesRepository;
    private final FileStorageService fileStorageService;

    @Override
    public ResponseEntity<?> getFilesForUser(String userId) {
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
    public ResponseEntity<?> addFileToAppointment(MultipartFile[] files, UploadRequest uploadRequest) {
        List<String> fileNames = new ArrayList<>();

        for(MultipartFile multipartFile : files){
            String fileName = fileStorageService.storeFile(multipartFile);

            File file = new File().toBuilder()
                    .appointmentId(uploadRequest.getAppointmentId())
                    .name(fileName)
                    .patientId(uploadRequest.getPatientId())
                    .build();

            filesRepository.save(file);
            fileNames.add(fileName);
        }

        return ResponseEntity.ok(fileNames);
    }
}
