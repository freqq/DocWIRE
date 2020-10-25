package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.dto.request.UploadRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FilesService {
    ResponseEntity<?> getListOfFilesForUser(String userId);
    ResponseEntity<?> getFileWithId(String fileId);
    ResponseEntity<?> addFilesToAppointment(List<MultipartFile> files, UploadRequest uploadRequest);
}
