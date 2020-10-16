/* eslint-disable prefer-template */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppointmentLeftWrapper = styled.div.attrs({ className: 'appointment-left-wrapper' })``;

const PatientCard = styled.div.attrs({ className: 'patient-card' })`
  border: 1px solid #f0f0f0;
  width: calc(90% - 40px);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  background: #fff;
`;

const UserCircle = styled.div.attrs({ className: 'user-circle' })`
  display: block;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  line-height: 80px;
  color: #ffffff;
  background: #2d4564;
  margin: 0 auto;
  text-align: center;
  font-size: 25px;
  margin-bottom: 20px;
  z-index: 999;
  position: relative;
`;

const UserName = styled.div.attrs({ className: 'user-name' })`
  text-align: center;
  margin-bottom: 5px;
`;

const UserTitle = styled.div.attrs({ className: 'user-title' })`
  text-align: center;
  font-size: 10px;
  font-weight: 100;
`;

const UserCard = styled.div.attrs({ className: 'user-card' })`
  border: 1px solid #f0f0f0;
  width: calc(90% - 40px);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.07);
  margin: -70px auto 0 auto;
  padding-top: 70px;
  z-index: 1;
  background: #fff;
`;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 100;
  font-size: 10px;
  margin-bottom: 5px;
`;

const SubTitle = styled.div.attrs({ className: 'sub-title' })`
  font-size: 12px;
`;

const UserDetailsWrapper = styled.div.attrs({ className: 'user-details-wrapper' })`
  margin-top: 30px;
  width: 85%;
  margin: 0 auto;
`;

const UserDetail = styled.div.attrs({ className: 'user-detail' })`
  margin-top: 20px;
`;

const AppointmentLeft = ({ data }) => {
  const getFullName = person => `${person.firstName} ${person.lastName}`;

  const getCircleData = person =>
    person.firstName.charAt(0).toUpperCase() + person.lastName.charAt(0).toUpperCase();

  const getEmail = person =>
    person.firstName.toLowerCase() + '.' + person.lastName.toLowerCase() + '@docwire.com';

  return (
    <AppointmentLeftWrapper>
      <PatientCard>
        <UserCircle>{getCircleData(data.patient)}</UserCircle>
        <UserCard>
          <UserName>{getFullName(data.patient)}</UserName>
          <UserTitle>{getEmail(data.patient)}</UserTitle>
        </UserCard>
        <UserDetailsWrapper>
          <UserDetail>
            <Title>Address</Title>
            <SubTitle>{data.patient.patientInfo.address}</SubTitle>
          </UserDetail>
          <UserDetail>
            <Title>Zip code</Title>
            <SubTitle>{data.patient.patientInfo.zipCode}</SubTitle>
          </UserDetail>
          <UserDetail>
            <Title>City</Title>
            <SubTitle>{data.patient.patientInfo.city}</SubTitle>
          </UserDetail>
          <UserDetail>
            <Title>Country</Title>
            <SubTitle>{data.patient.patientInfo.country}</SubTitle>
          </UserDetail>
        </UserDetailsWrapper>
      </PatientCard>
    </AppointmentLeftWrapper>
  );
};

const mapStateToProps = state => ({
  data: state.appointmentDetails.details.data,
});

AppointmentLeft.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(AppointmentLeft);
