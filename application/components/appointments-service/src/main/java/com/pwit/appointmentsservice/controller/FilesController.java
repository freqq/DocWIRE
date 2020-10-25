package com.pwit.appointmentsservice.controller;

import com.pwit.appointmentsservice.dto.request.UploadRequest;
import com.pwit.appointmentsservice.service.FilesService;
import com.pwit.common.utils.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import static com.pwit.common.security.Authorities.ROLE_USER;
import static com.pwit.common.security.SecurityUtils.getCurrentUsername;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/appointments/files")
public class FilesController {
    private static final Logger LOGGER = new Logger();

    private final FilesService filesService;

    /**
     * Gets all files uploaded for given user.
     *
     * @param userId  Id of user to get the files for
     */
    @Secured(ROLE_USER)
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getFilesForUser(@PathVariable("userId") String userId) {
        LOGGER.info("Getting files of user with id {}.", userId);
        return filesService.getFilesForUser(userId);
    }

    /**
     * Adds new files to given appointment
     *
     * @param files   List of files to upload
     */
    @Secured(ROLE_USER)
    @PostMapping(value = "/upload", consumes = { MediaType.APPLICATION_JSON_VALUE,
                                                 MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> addFileToAppointment(@RequestPart("file") final MultipartFile[] files,
                                                  @RequestPart("json") @Valid UploadRequest uploadRequest) {
        LOGGER.info("Uploading files for the appointment with id {}.", getCurrentUsername());
        return filesService.addFileToAppointment(files, uploadRequest);
    }
}
