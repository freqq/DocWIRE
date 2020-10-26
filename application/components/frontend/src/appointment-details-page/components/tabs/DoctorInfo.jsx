import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DoctorInfoWrapper = styled.div.attrs({ className: 'doctor-info-wrapper' })`
  padding: 20px;
`;

const DoctorGrid = styled.div.attrs({ className: 'doctor-grid' })`
  margin: 0 0 10px 0;
  display: grid;
  grid-template-columns: 15% 1fr;
`;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 600;
`;

const Content = styled.div.attrs({ className: 'content' })`
  font-weight: 100;
`;

const DoctorInfo = ({ doctorData }) => {
  const camelize = str => str.substring(0, 1).toUpperCase() + str.substring(1);

  const getFullNameWithSpec = () =>
    `${doctorData.doctorInfo.title} ${doctorData.firstName} ${doctorData.lastName}`;

  const getSpecialization = () => camelize(doctorData.doctorInfo.specialization.toLowerCase());

  const getDetails = () => doctorData.doctorInfo.aboutMe;

  return (
    <DoctorInfoWrapper>
      <DoctorGrid>
        <Title>Name</Title>
        <Content>{getFullNameWithSpec()}</Content>
      </DoctorGrid>
      <DoctorGrid>
        <Title>Specialization</Title>
        <Content>{getSpecialization()}</Content>
      </DoctorGrid>
      <DoctorGrid>
        <Title>Details</Title>
        <Content>{getDetails()}</Content>
      </DoctorGrid>
    </DoctorInfoWrapper>
  );
};

DoctorInfo.propTypes = {
  doctorData: PropTypes.instanceOf(Object).isRequired,
};

export default DoctorInfo;
