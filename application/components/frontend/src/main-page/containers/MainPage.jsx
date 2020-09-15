import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';

import { DIAGNOSE_PATH } from 'RootRouter';
import MainPageNavbar from 'main-page/components/MainPageNavbar';
import MainPageCard from 'main-page/components/MainPageCard';
import CommonIssues from 'main-page/components/CommonIssues';
import MainPageFooter from 'main-page/components/MainPageFooter';
import OverNavBar from 'main-page/components/OverNavBar';

import mainPageBackground from 'images/main_page_bg.svg';

const MainPageWrapper = styled.div.attrs({ className: 'main-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(${mainPageBackground});
  background-size: 35%;
  background-repeat: no-repeat;
  background-position: right 120px center;

  @media only screen and (max-width: 1000px) {
    background: none;
  }
`;

const MainPageContainer = styled.div.attrs({ className: 'main-page-container' })`
  width: 70%;
  margin: 0 auto;
`;

const MainPage = () => {
  const [startDiagnose, setStartDiagnose] = useState(false);

  return (
    <MainPageWrapper>
      <OverNavBar />
      <MainPageContainer>
        <MainPageNavbar />
        <MainPageCard setStartDiagnose={setStartDiagnose} />
        <CommonIssues />
        <MainPageFooter />
      </MainPageContainer>
      {startDiagnose && <Redirect to={DIAGNOSE_PATH} />}
    </MainPageWrapper>
  );
};

export default MainPage;
