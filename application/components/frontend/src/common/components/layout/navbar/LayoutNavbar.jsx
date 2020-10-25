import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { logoutUser } from 'common/actions/authUserActions';
import { connect } from 'react-redux';

import SearchBar from 'common/components/layout/navbar/SearchBar';
import UserSection from 'common/components/layout/navbar/UserSection';
import NotificationsBell from 'common/components/layout/navbar/NotificationsBell';
import UserDropdownMenu from 'common/components/layout/navbar/UserDropdownMenu';

const LayoutNavbarWrapper = styled.div.attrs({ className: 'layout-navbar-wrapper' })`
  width: calc(100% - 50px);
  height: 50px;
  line-height: 50px;
  padding: 10px 25px;
  border-bottom: 1px solid #f0f0f0;
  background: #ffffff;
`;

const RightSide = styled.div.attrs({ className: 'right-side' })`
  float: right;
  position: relative;
`;

const LayoutNavbar = ({ logoutUserFunc, firstName, lastName, currentUserId, accountType }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const switchShowDropdown = () => setShowDropdown(!showDropdown);

  return (
    <LayoutNavbarWrapper>
      <SearchBar />
      <RightSide>
        <NotificationsBell />
        <UserSection
          userId={currentUserId}
          firstName={firstName}
          lastName={lastName}
          bottomText={accountType === 'DOCTOR' ? 'Doctor' : 'Patient'}
          circleSize={35}
          accountType={accountType}
          switchShowDropdown={switchShowDropdown}
        />
        {showDropdown && (
          <UserDropdownMenu logoutUserFunc={logoutUserFunc} onOutsideClick={switchShowDropdown} />
        )}
      </RightSide>
    </LayoutNavbarWrapper>
  );
};

const mapStateToProps = state => ({
  firstName: state.common.accountData.userData.firstName,
  lastName: state.common.accountData.userData.lastName,
  accountType: state.common.accountData.userData.accountType,
  currentUserId: state.common.authUser.keycloakInfo.subject,
});

const mapDispatchToProps = dispatch => ({
  logoutUserFunc: () => dispatch(logoutUser()),
});

LayoutNavbar.propTypes = {
  logoutUserFunc: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutNavbar);
