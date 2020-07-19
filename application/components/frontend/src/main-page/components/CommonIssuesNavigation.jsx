import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import leftArrowIcon from 'images/icons/left_arrow.svg';
import rightArrowIcon from 'images/icons/right_arrow.svg';

const CommonIssuesNavigationWrapper = styled.div.attrs({
  className: 'common-issues-navigation-wrapper',
})`
  text-align: right;
  margin-top: 20px;
  padding-right: 25px;
`;

const RightArrow = styled.img.attrs({
  className: 'right-arrow',
})`
  width: 30px;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.5;
  }
`;

const LeftArrow = styled.img.attrs({
  className: 'right-arrow',
})`
  width: 30px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.5;
  }
`;

const UNAVAILABLE_ARROW_STYLE = {
  opacity: '0.2',
  cursor: 'default',
};

const CommonIssueNavigation = ({ isPrevious, isNext }) => (
  <CommonIssuesNavigationWrapper>
    <LeftArrow
      src={leftArrowIcon}
      alt="left-arrow"
      style={isPrevious ? {} : UNAVAILABLE_ARROW_STYLE}
    />
    <RightArrow
      src={rightArrowIcon}
      alt="left-arrow"
      style={isNext ? {} : UNAVAILABLE_ARROW_STYLE}
    />
  </CommonIssuesNavigationWrapper>
);

CommonIssueNavigation.propTypes = {
  isPrevious: PropTypes.bool.isRequired,
  isNext: PropTypes.bool.isRequired,
};

export default CommonIssueNavigation;
