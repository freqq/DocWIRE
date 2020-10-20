import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DoctorDetailsWrapper = styled.div.attrs({ className: 'doctor-details-wrapper' })`
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

const DoctorDataItem = styled.div.attrs({ className: 'doctor-data-item' })`
  margin-bottom: 30px;
`;

const DoctorDataTitle = styled.p.attrs({ className: 'doctor-data-title' })`
  margin: 0 0 5px 0;
  font-weight: 400;
`;
const DoctorDataContent = styled.p.attrs({ className: 'doctor-data-content' })`
  margin: 0;
  font-weight: 100;
`;

const DoctorDetails = ({ doctorData }) => (
  <DoctorDetailsWrapper>
    <ThreeSideGrid>
      {doctorData.map(item => (
        <DoctorDataItem key={item.id}>
          <DoctorDataTitle>{item.title}</DoctorDataTitle>
          <DoctorDataContent>{item.content}</DoctorDataContent>
        </DoctorDataItem>
      ))}
    </ThreeSideGrid>
  </DoctorDetailsWrapper>
);

DoctorDetails.propTypes = {
  doctorData: PropTypes.instanceOf(Object).isRequired,
};

export default DoctorDetails;
