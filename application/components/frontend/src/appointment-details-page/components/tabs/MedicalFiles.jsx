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

const MedicalFiles = ({ uploadFilesFunc, isLoading, isError, filesData }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const selectedFiles = acceptedFiles.map(file => (
    <li key={file.path}>{`${file.path} - ${file.size} bytes`}</li>
  ));

  const onFilesSend = () => {
    uploadFilesFunc(acceptedFiles);
  };

  return (
    <MedicalFilesWrapper>
      <FilesDropdown>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag &apos;n drop files here, or click to select files...</p>
        </div>
        <div>
          <h4>Files list</h4>
          <ul>{selectedFiles}</ul>
        </div>
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
  filesData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFiles);
