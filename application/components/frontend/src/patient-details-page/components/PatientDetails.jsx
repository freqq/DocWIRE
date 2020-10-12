import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PatientDetailsWrapper = styled.div.attrs({ className: 'patient-details-wrapper' })`
  border-radius: 5px;
  padding: 30px;
  background: #ffffff;
  width: calc(100% - 62px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  font-size: 11px;
`;

const ThreeSideGrid = styled.div.attrs({ className: 'three-side-grid' })`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const PatientDataItem = styled.div.attrs({ className: 'patient-data-item' })`
  margin-bottom: 30px;
`;

const PatientDataTitle = styled.p.attrs({ className: 'patient-data-title' })`
  margin: 0 0 5px 0;
  font-weight: 400;
`;
const PatientDataContent = styled.p.attrs({ className: 'patient-data-content' })`
  margin: 0;
  font-weight: 100;
`;

const PatientDetails = ({ patientData }) => (
  <PatientDetailsWrapper>
    <ThreeSideGrid>
      {patientData.map(patientDataItem => (
        <PatientDataItem key={patientDataItem.id}>
          <PatientDataTitle>{patientDataItem.title}</PatientDataTitle>
          <PatientDataContent>{patientDataItem.content}</PatientDataContent>
        </PatientDataItem>
      ))}
    </ThreeSideGrid>
  </PatientDetailsWrapper>
);

PatientDetails.propTypes = {
  patientData: PropTypes.instanceOf(Object).isRequired,
};

export default PatientDetails;
