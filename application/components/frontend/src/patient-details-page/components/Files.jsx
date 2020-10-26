import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { downloadFile } from 'appointment-details-page/actions/fileActions';
import fileIcon from 'images/icons/file.svg';
import downloadIcon from 'images/icons/download.svg';

const FilesWrapper = styled.div.attrs({ className: 'files-wrapper' })`
  font-weight: 100;
  padding: 15px 10px;
  background: #ffffff;
  height: calc(100% - 52px);
  width: calc(100% - 22px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  font-weight: 400;
  margin-bottom: 10px;
`;

const FilesList = styled.ul.attrs({ className: 'files-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: calc(100% - 25px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const FilesListItem = styled.li.attrs({ className: 'files-list-item' })`
  margin-bottom: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 8% 1fr 10%;
  padding: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FileIconWrapper = styled.div.attrs({ className: 'files-icon-wrapper' })``;
const FileIcon = styled.img.attrs({ className: 'files-icon' })`
  width: 15px;
`;

const FileName = styled.div.attrs({ className: 'files-name' })`
  line-height: 18px;
  text-overflow: ellipsis;
  max-width: 80%;
  overflow: hidden;
`;

const NoFilesUploaded = styled.div.attrs({ className: 'no-files-uploaded' })`
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  background: #333;
`;

const FileDetails = styled.div.attrs({ className: 'files-details' })`
  text-align: right;
  font-size: 10px;
  line-height: 18px;
  vertical-align: middle;
  position: relative;
`;

const DownloadIcon = styled.img.attrs({ className: 'download-icon' })`
  width: 15px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Files = ({ data, downloadFileFunc }) => {
  const onDownloadMethod = fileId => {
    downloadFileFunc(fileId);
  };

  return (
    <FilesWrapper>
      <CardTitle>Files/Documents</CardTitle>
      {data.patientData.fileResponses.length === 0 ? (
        <NoFilesUploaded>No files upladed for user yet.</NoFilesUploaded>
      ) : (
        <FilesList>
          {data.patientData.fileResponses.map(file => (
            <FilesListItem key={file.id}>
              <FileIconWrapper>
                <FileIcon src={fileIcon} alt="file-icon" />
              </FileIconWrapper>
              <FileName>{file.name}</FileName>
              <FileDetails>
                <DownloadIcon
                  onClick={() => onDownloadMethod(file.id)}
                  src={downloadIcon}
                  alt="download-icon"
                />
              </FileDetails>
            </FilesListItem>
          ))}
        </FilesList>
      )}
    </FilesWrapper>
  );
};

const mapStateToProps = state => ({
  data: state.patient.patientDetails.data,
});

const mapDispatchToProps = dispatch => ({
  downloadFileFunc: fileId => dispatch(downloadFile(fileId)),
});

Files.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  downloadFileFunc: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
