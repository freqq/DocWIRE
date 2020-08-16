import React from 'react';
import styled from 'styled-components';

import AppLeftNav from 'app/components/AppLeftNav';
import AppMainContent from 'app/components/AppMainContent';

const AppPageWrapper = styled.div.attrs({ className: 'app-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const HEADER_HEIGHT = 100;

const AppPage = () => (
  <AppPageWrapper>
    <AppLeftNav headerHeight={HEADER_HEIGHT} />
    <AppMainContent headerHeight={HEADER_HEIGHT} />
  </AppPageWrapper>
);

export default AppPage;
