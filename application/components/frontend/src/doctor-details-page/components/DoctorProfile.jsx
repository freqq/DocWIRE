import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const DoctorProfileWrapper = styled.div.attrs({
  className: 'doctor-profile-wrapper',
})`
  border-radius: 5px;
  padding: 15px;
  background: #ffffff;
  height: auto;
  width: calc(100% - 30px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
`;

const UserCircle = styled.div.attrs({ className: 'user-circle' })`
  background: #2d4564;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
  cursor: pointer;
  height: 100px;
  width: 100px;
  line-height: 100px;
  font-size: 26px;
`;

const UserName = styled.p.attrs({ className: 'user-name' })`
  text-align: center;
  margin: 10px 0 5px 0;
  width: 100%;
  font-size: 20px;
  font-weight: 100;
`;

const UserEmail = styled.p.attrs({ className: 'user-email' })`
  text-align: center;
  margin: 0;
  width: 100%;
  font-size: 9px;
  font-weight: 100;
`;

const SendMessageButton = styled.button.attrs({ className: 'send-message-button' })`
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  text-align: center;
  width: calc(90% - 20px);
  margin: 15px auto 0 auto;
  display: block;
  padding: 10px;
  background: #ffffff;
  font-weight: 100;
  font-size: 11px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #fafafa;
  }
`;

const DoctorProfile = ({ firstName, lastName, email, loggedInUserId, userData }) => {
  const getCircleContent = () => firstName.charAt(0) + lastName.charAt(0);

  return (
    <DoctorProfileWrapper>
      <UserCircle>{getCircleContent()}</UserCircle>
      <UserName>{`${firstName} ${lastName}`}</UserName>
      <UserEmail>{email}</UserEmail>
      {loggedInUserId !== userData.doctorData.userId && (
        <SendMessageButton>Send message</SendMessageButton>
      )}
    </DoctorProfileWrapper>
  );
};

DoctorProfile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  loggedInUserId: state.common.authUser.keycloakInfo.subject,
  userData: state.doctor.doctorDetails.data,
});

export default connect(mapStateToProps, null)(DoctorProfile);
