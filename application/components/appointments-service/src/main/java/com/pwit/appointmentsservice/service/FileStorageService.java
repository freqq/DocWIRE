package com.pwit.appointmentsservice.service;

import com.pwit.appointmentsservice.exception.InvalidFilesException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Arrays;
import java.util.List;

@Service
public class FileStorageService {
    private static final List<String> ALLOWED_EXTENSION_LIST = Arrays.asList("jpg", "jpeg", "gif", "png", "bmp", "pdf");
    private static final int ALLOWED_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
    private static final int ALLOWED_MAX_FILES_COUNT = 5;

    public void validateFiles(List<MultipartFile> files) {
        if (files.size() > ALLOWED_MAX_FILES_COUNT)
            throw new InvalidFilesException("Invalid files size.");

        for (MultipartFile file : files) {
            String extension = FilenameUtils.getExtension(file.getOriginalFilename());
            if (!ALLOWED_EXTENSION_LIST.contains(extension) || file.getSize() > ALLOWED_MAX_FILE_SIZE_BYTES)
                throw new InvalidFilesException("Invalid files extension.");
        }
    }
}
