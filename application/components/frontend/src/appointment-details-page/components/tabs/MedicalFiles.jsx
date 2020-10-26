/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import { uploadFiles, downloadFile } from 'appointment-details-page/actions/fileActions';

const MedicalFilesWrapper = styled.div.attrs({ className: 'medical-files-wrapper' })`
  padding: 20px;
  position: relative;
`;

const FilesDropdown = styled.div.attrs({ className: 'files-dropdown' })`
  margin: 0;
`;

const UploadedFiles = styled.div.attrs({ className: 'uploaded-files' })`
  padding: 10px;
  margin: 0 0 10px 0;
`;

const NoUploadedFiles = styled.div.attrs({ className: 'no-uploaded-files' })`
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  background: #333;
`;

const UploadedFilesTitle = styled.h2.attrs({ className: 'uploaded-files-title' })`
  font-weight: 700;
  margin: 0;
`;

const UploadedFilesList = styled.ul.attrs({ className: 'uploaded-files-list' })`
  margin: 0;
`;

const UploadFilesListItem = styled.li.attrs({ className: 'uploaded-files-list-item' })`
  font-weight: 100;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SendButton = styled.button.attrs({ className: 'send-button' })`
  margin: 0;
  padding: 10px 20px;
  border-radius: 4px;
  background: #2d4564;
  font-size: 10px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  outline: none;
  border: none;
  margin-top: 10px;

  &:hover {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MedicalFiles = ({
  uploadFilesFunc,
  isLoading,
  isError,
  filesData,
  appointmentId,
  patientId,
  downloadFileFunc,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const getMbSize = file => (file.size / Math.pow(1024, 2)).toFixed(2);

  const selectedFiles = acceptedFiles.map(file => (
    <li key={file.path}>{`${file.path} - ${getMbSize(file)} MB`}</li>
  ));

  const onFilesSend = () => {
    const formData = new FormData();

    formData.append('appointmentId', appointmentId);
    formData.append('patientId', patientId);
    acceptedFiles.forEach(file => formData.append('multipartfiles', file));

    uploadFilesFunc(formData);
  };

  const isUploadDisabled = () => isLoading || acceptedFiles.length === 0;

  const downloadFileMethod = fileId => {
    downloadFileFunc(fileId);
  };

  return (
    <MedicalFilesWrapper style={isLoading ? { opacity: '0.5' } : {}}>
      <UploadedFiles>
        <UploadedFilesTitle>Uploaded files:</UploadedFilesTitle>
        {filesData.length === 0 ? (
          <NoUploadedFiles>No files upladed yes</NoUploadedFiles>
        ) : (
          <UploadedFilesList>
            {filesData.map(file => (
              <UploadFilesListItem onClick={() => downloadFileMethod(file.id)}>
                {file.name}
              </UploadFilesListItem>
            ))}
          </UploadedFilesList>
        )}
      </UploadedFiles>
      <FilesDropdown>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag &apos;n drop files here, or click to select files...</p>
        </div>
        <div>
          <h4>List of filed to upload:</h4>
          {acceptedFiles.length !== 0 ? (
            <ul>{selectedFiles}</ul>
          ) : (
            <div>No files selected yet.</div>
          )}
        </div>
        <SendButton type="button" onClick={onFilesSend} disabled={isUploadDisabled()}>
          Send files
        </SendButton>
      </FilesDropdown>
      {isLoading && <ProgressIndicatorCircular />}
    </MedicalFilesWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appointmentDetails.files.isLoading,
  isError: state.appointmentDetails.files.isError,
});

const mapDispatchToProps = dispatch => ({
  uploadFilesFunc: filesList => dispatch(uploadFiles(filesList)),
  downloadFileFunc: fileId => dispatch(downloadFile(fileId)),
});

MedicalFiles.propTypes = {
  uploadFilesFunc: PropTypes.func.isRequired,
  downloadFileFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  appointmentId: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  filesData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFiles);
