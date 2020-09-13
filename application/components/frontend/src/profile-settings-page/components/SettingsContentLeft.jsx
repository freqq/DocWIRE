import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const SettingsContentLeftWrapper = styled.div.attrs({ className: 'settings-content-left-wrapper' })`
  padding: 20px 10px;
  background: #ffffff;
  height: calc(100% - 40px);
  width: calc(100% - 20px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
`;

const UserCircle = styled.div.attrs({ className: 'user-circle' })`
  display: block;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  line-height: 100px;
  color: #ffffff;
  background: #2d4564;
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
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

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 40px;
`;

const GridComponent = styled.div.attrs({ className: 'grid-component' })`
  text-align: center;
`;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 100;
  font-size: 10px;
  margin-bottom: 5px;
`;

const SubTitle = styled.div.attrs({ className: 'sub-title' })`
  font-size: 13px;
`;

const UserDetailsWrapper = styled.div.attrs({ className: 'user-details-wrapper' })`
  margin-top: 30px;
  width: 85%;
  margin: 0 auto;
`;

const UserDetail = styled.div.attrs({ className: 'user-detail' })`
  margin-top: 20px;
`;

const SettingsContentLeft = ({ firstName, lastName, email }) => {
  const getCircleText = () => firstName.charAt(0) + lastName.charAt(0);

  return (
    <SettingsContentLeftWrapper>
      <UserCircle>{getCircleText()}</UserCircle>
      <UserCard>
        <UserName>{`${firstName} ${lastName}`}</UserName>
        <UserTitle>{email}</UserTitle>
        <TwoSideGrid>
          <GridComponent>
            <Title>Role</Title>
            <SubTitle>Patient</SubTitle>
          </GridComponent>
          <GridComponent>
            <Title>Role</Title>
            <SubTitle>Patient</SubTitle>
          </GridComponent>
        </TwoSideGrid>
      </UserCard>
      <UserDetailsWrapper>
        <UserDetail>
          <Title>Address</Title>
          <SubTitle>99 Meadow City</SubTitle>
        </UserDetail>
        <UserDetail>
          <Title>Zip code</Title>
          <SubTitle>606584-3274</SubTitle>
        </UserDetail>
        <UserDetail>
          <Title>City</Title>
          <SubTitle>San Francisco</SubTitle>
        </UserDetail>
        <UserDetail>
          <Title>Country</Title>
          <SubTitle>United States of America</SubTitle>
        </UserDetail>
      </UserDetailsWrapper>
    </SettingsContentLeftWrapper>
  );
};

const mapStateToProps = state => ({
  firstName: state.common.accountData.userData.firstName,
  lastName: state.common.accountData.userData.lastName,
  email: state.common.authUser.keycloakInfo.userInfo.email,
});

SettingsContentLeft.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(SettingsContentLeft);
