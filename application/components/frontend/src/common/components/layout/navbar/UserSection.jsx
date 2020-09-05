import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowDownIcon from 'images/icons/down-arrow.svg';

const UserSectionWrapper = styled.div.attrs({ className: 'user-section-wrapper' })`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
`;

const FlexBox = styled.div.attrs({ className: 'flex-box' })`
  display: flex;
`;

const UserCircle = styled.div.attrs({ className: 'user-circle' })`
  background: #2d4564;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
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

const UserSection = ({
  firstName,
  lastName,
  bottomText,
  showIcon,
  circleSize,
  circleFontSize,
  switchShowDropdown,
}) => {
  const getCircleText = () => firstName.charAt(0) + lastName.charAt(0);

  return (
    <UserSectionWrapper>
      <FlexBox style={{ height: `${circleSize}px` }}>
        <UserCircle
          style={{
            height: `${circleSize}px`,
            width: `${circleSize}px`,
            lineHeight: `${circleSize}px`,
            fontSize: `${circleFontSize}px`,
          }}
        >
          {getCircleText()}
        </UserCircle>
        <UserDetails
          style={{
            lineHeight: `${circleSize / 2}px`,
          }}
        >
          <UserName>{`${firstName} ${lastName}`}</UserName>
          <UserRole>{bottomText}</UserRole>
        </UserDetails>
        <ArrowDown
          src={arrowDownIcon}
          alt="arrowDownIcon"
          style={showIcon ? {} : { display: 'none' }}
          onClick={switchShowDropdown}
        />
      </FlexBox>
    </UserSectionWrapper>
  );
};

UserSection.defaultProps = {
  showIcon: true,
  circleSize: 40,
  circleFontSize: 11,
  switchShowDropdown: null,
};

UserSection.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  circleSize: PropTypes.number,
  circleFontSize: PropTypes.number,
  switchShowDropdown: PropTypes.func,
};

export default UserSection;
