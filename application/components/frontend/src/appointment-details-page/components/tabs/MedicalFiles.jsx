/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import { uploadFiles } from 'appointment-details-page/actions/fileActions';

const MedicalFilesWrapper = styled.div.attrs({ className: 'medical-files-wrapper' })`
  padding: 20px;
  position: relative;
`;

const FilesDropdown = styled.div.attrs({ className: 'files-dropdownr' })`
  margin: 0;
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
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const getMbSize = file => (file.size / Math.pow(1024, 2)).toFixed(2);

  const selectedFiles = acceptedFiles.map(file => (
    <li key={file.path}>{`${file.path} - ${getMbSize(file)} MB`}</li>
  ));

  const onFilesSend = () => {
    const uploadFileRequest = {
      appointmentId,
      patientId,
    };

    uploadFilesFunc(uploadFileRequest, acceptedFiles);
  };

  const isUploadDisabled = () => isLoading || acceptedFiles.length === 0;

  return (
    <MedicalFilesWrapper>
      <FilesDropdown>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag &apos;n drop files here, or click to select files...</p>
        </div>
        <div>
          <h4>Files list:</h4>
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
  filesData: state.appointmentDetails.files.data,
});

const mapDispatchToProps = dispatch => ({
  uploadFilesFunc: filesList => dispatch(uploadFiles(filesList)),
});

MedicalFiles.propTypes = {
  uploadFilesFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  appointmentId: PropTypes.string.isRequired,
  patientId: PropTypes.string.isRequired,
  filesData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFiles);
