import React from 'react';
import styled from 'styled-components';
import MainPageNavbar from 'main-page/components/MainPageNavbar';
import MainPageCard from 'main-page/components/MainPageCard';
import CommonIssues from 'main-page/components/CommonIssues';
import MainPageFooter from 'main-page/components/MainPageFooter';

import mainPageBackground from 'images/main_page_bg.svg';

const MainPageWrapper = styled.div.attrs({ className: 'main-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(${mainPageBackground});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: right 80px center;
`;

const MainPageContainer = styled.div.attrs({ className: 'main-page-continer' })`
  width: 70%;
  margin: 0 auto;
`;

const MainPage = () => (
  <MainPageWrapper>
    <MainPageContainer>
      <MainPageNavbar />
      <MainPageCard />
      <CommonIssues />
      <MainPageFooter />
    </MainPageContainer>
  </MainPageWrapper>
);

export default MainPage;
