import React from 'react';
import styled from 'styled-components';

import Notes from 'patient-details-page/components/Notes';
import Files from 'patient-details-page/components/Files';

const PatientDetailsGridRightSideWrapper = styled.div.attrs({
  className: 'patient-details-grid-right-side-wrapper',
})`
  width: calc(100% - 25px);
  display: grid;
  grid-template-rows: 40% 60%;
  overflow: hidden;
  gap: 20px;
  height: calc(100% - 14px);
`;

const UPLOADED_FILES = [
  {
    id: 1,
    name: 'Check_Up_Result.pdf',
    size: '123kb',
  },
  {
    id: 2,
    name: 'Dental_X-Ray_Result_2.pdf',
    size: '2.5Mb',
  },
  {
    id: 3,
    name: 'Medial_Prescriptions.pdf',
    size: '76kb',
  },
  {
    id: 4,
    name: 'Results_Chemistry.pdf',
    size: '123kb',
  },
  {
    id: 5,
    name: 'GEO-Redundancy.pdf',
    size: '2.5Mb',
  },
  {
    id: 6,
    name: 'Medial_Prescriptions.pdf',
    size: '76kb',
  },
  {
    id: 7,
    name: 'Medial_Prescriptions.pdf',
    size: '76kb',
  },
  {
    id: 8,
    name: 'Check_Up_Result.pdf',
    size: '123kb',
  },
  {
    id: 9,
    name: 'Dental_X-Ray_Result_2.pdf',
    size: '2.5Mb',
  },
  {
    id: 10,
    name: 'Medial_Prescriptions.pdf',
    size: '76kb',
  },
];

const PatientDetailsGridRightSide = () => (
  <PatientDetailsGridRightSideWrapper>
    <Notes />
    <Files uploadedFiles={UPLOADED_FILES} />
  </PatientDetailsGridRightSideWrapper>
);

export default PatientDetailsGridRightSide;
