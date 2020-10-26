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

const PatientDetailsGridRightSide = () => (
  <PatientDetailsGridRightSideWrapper>
    <Notes />
    <Files />
  </PatientDetailsGridRightSideWrapper>
);

export default PatientDetailsGridRightSide;
