package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.dto.request.UploadRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FilesService {
    ResponseEntity<?> getFilesForUser(String userId);
    ResponseEntity<?> addFileToAppointment(MultipartFile[] files, UploadRequest uploadRequest);
}
