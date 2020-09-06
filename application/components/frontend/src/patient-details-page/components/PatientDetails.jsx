import React from 'react';
import styled from 'styled-components';

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

const PATIENT_DATA = [
  {
    id: 1,
    title: 'Gender',
    content: 'Female',
  },
  {
    id: 2,
    title: 'Birthday',
    content: 'Feb 24th, 1997',
  },
  {
    id: 3,
    title: 'Phone Number',
    content: '(239) 555-0180',
  },
  {
    id: 4,
    title: 'Street Address',
    content: 'Jl. Diponergogo No. 21',
  },
  {
    id: 5,
    title: 'City',
    content: 'Chicago',
  },
  {
    id: 6,
    title: 'ZIP Code',
    content: '39-460',
  },
  {
    id: 7,
    title: 'Member Status',
    content: 'Active Member',
  },
  {
    id: 8,
    title: 'Registered Date',
    content: 'Jun 7th, 2019',
  },
];

const PatientDetails = () => (
  <PatientDetailsWrapper>
    <ThreeSideGrid>
      {PATIENT_DATA.map(patientDataItem => (
        <PatientDataItem key={patientDataItem.id}>
          <PatientDataTitle>{patientDataItem.title}</PatientDataTitle>
          <PatientDataContent>{patientDataItem.content}</PatientDataContent>
        </PatientDataItem>
      ))}
    </ThreeSideGrid>
  </PatientDetailsWrapper>
);

export default PatientDetails;
