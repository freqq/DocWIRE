import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LayoutLeftNav from 'common/components/layout/LayoutLeftNav';
import LayoutMainContent from 'common/components/layout/LayoutMainContent';

const LayoutWrapper = styled.div.attrs({ className: 'layout-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const HEADER_HEIGHT = 100;

const Layout = ({ children }) => (
  <LayoutWrapper>
    <LayoutLeftNav headerHeight={HEADER_HEIGHT} />
    <LayoutMainContent headerHeight={HEADER_HEIGHT}>{children}</LayoutMainContent>
  </LayoutWrapper>
);

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Layout;
