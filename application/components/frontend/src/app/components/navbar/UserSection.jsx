import React from 'react';
import styled from 'styled-components';

import arrowDownIcon from 'images/icons/down-arrow.svg';

const UserSectionWrapper = styled.div.attrs({ className: 'user-section-wrapper' })`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
`;

const FlexBox = styled.div.attrs({ className: 'flex-box' })`
  display: flex;
  height: 40px;
`;

const UserCircle = styled.div.attrs({ className: 'user-circle' })`
  height: 40px;
  width: 40px;
  background: #2d4564;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
  display: inline-block;
  margin-right: 10px;
`;

const UserDetails = styled.div.attrs({ className: 'user-details' })`
  display: inline-block;
  font-size: 12px;
  line-height: 20px;
`;

const UserName = styled.p.attrs({ className: 'user-name' })`
  margin: 0;
  padding: 0;
  font-weight: 400;
`;

const UserRole = styled.p.attrs({ className: 'user-role' })`
  margin: 0;
  padding: 0;
  font-weight: 100;
`;

const ArrowDown = styled.img.attrs({ className: 'arrow-down' })`
  height: 12px;
  display: inline-block;
  margin: auto 0 auto 12px;
  cursor: pointer;
`;

const UserSection = () => (
  <UserSectionWrapper>
    <FlexBox>
      <UserCircle>A</UserCircle>
      <UserDetails>
        <UserName>Steven Holland</UserName>
        <UserRole>Patient</UserRole>
      </UserDetails>
      <ArrowDown src={arrowDownIcon} alt="arrowDownIcon" />
    </FlexBox>
  </UserSectionWrapper>
);

export default UserSection;
