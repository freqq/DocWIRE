import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DoctorProfile from 'doctor-details-page/components/DoctorProfile';
import DoctorDetails from 'doctor-details-page/components/DoctorDetails';
import DoctorReviews from 'doctor-details-page/components/DoctorReviews';

const DoctorDetailsGridLeftSideWrapper = styled.div.attrs({
  className: 'doctor-details-grid-left-side-wrapper',
})`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-rows: 40% 60%;
  height: 100%;
  overflow: hidden;
  max-height: 78vh;
`;

const TopGrid = styled.div.attrs({ className: 'top-grid' })`
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 20px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`;

const DoctorDetailsGridLeftSide = ({ firstName, lastName, email, doctorData, reviews }) => (
  <DoctorDetailsGridLeftSideWrapper>
    <TopGrid>
      <DoctorProfile firstName={firstName} lastName={lastName} email={email} />
      <DoctorDetails doctorData={doctorData} />
    </TopGrid>
    <DoctorReviews reviews={reviews} />
  </DoctorDetailsGridLeftSideWrapper>
);

DoctorDetailsGridLeftSide.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  doctorData: PropTypes.instanceOf(Object).isRequired,
  reviews: PropTypes.instanceOf(Object).isRequired,
};

export default DoctorDetailsGridLeftSide;
