import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LayoutNavbar from 'common/components/layout/navbar/LayoutNavbar';

const LayoutContentWrapper = styled.div.attrs({ className: 'app-main-content-wrapper' })`
  width: 100%;
  height: 100%;
  background: #f4f4fa;
`;

const LayoutMainContent = ({ children }) => (
  <LayoutContentWrapper>
    <LayoutNavbar />
    {children}
  </LayoutContentWrapper>
);

LayoutMainContent.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default LayoutMainContent;
