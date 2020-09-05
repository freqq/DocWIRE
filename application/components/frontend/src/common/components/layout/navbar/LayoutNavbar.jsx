import React, { useState } from 'react';
import styled from 'styled-components';

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

const LayoutNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const switchShowDropdown = () => setShowDropdown(!showDropdown);

  return (
    <LayoutNavbarWrapper>
      <SearchBar />
      <RightSide>
        <NotificationsBell />
        <UserSection
          firstName="Steven"
          lastName="Holland"
          bottomText="Patient"
          circleSize={35}
          switchShowDropdown={switchShowDropdown}
        />
        {showDropdown && <UserDropdownMenu onOutsideClick={switchShowDropdown} />}
      </RightSide>
    </LayoutNavbarWrapper>
  );
};

export default LayoutNavbar;
