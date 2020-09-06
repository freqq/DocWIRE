import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PatientProfile from 'patient-details-page/components/PatientProfile';
import PatientDetails from 'patient-details-page/components/PatientDetails';
import PatientHistory from 'patient-details-page/components/PatientHistory';

const PatientDetailsGridLeftSideWrapper = styled.div.attrs({
  className: 'patient-details-grid-left-side-wrapper',
})`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-rows: 40% 60%;
  height: 100%;
  overflow: hidden;
`;

const TopGrid = styled.div.attrs({ className: 'top-grid' })`
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 20px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`;

const PatientDetailsGridLeftSide = ({ firstName, lastName, email, treatmentHistory }) => (
  <PatientDetailsGridLeftSideWrapper>
    <TopGrid>
      <PatientProfile firstName={firstName} lastName={lastName} email={email} />
      <PatientDetails />
    </TopGrid>
    <PatientHistory treatmentHistory={treatmentHistory} />
  </PatientDetailsGridLeftSideWrapper>
);

PatientDetailsGridLeftSide.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  treatmentHistory: PropTypes.instanceOf(Object).isRequired,
};

export default PatientDetailsGridLeftSide;
