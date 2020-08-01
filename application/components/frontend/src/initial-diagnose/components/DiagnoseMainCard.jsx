import React from 'react';
import styled from 'styled-components';

import mainLogo from 'images/main_logo.svg';

import MainCardFooter from 'initial-diagnose/components/MainCardFooter';

const DiagnoseMainCardWrapper = styled.div.attrs({ className: 'diagnose-main-card-wrapper' })`
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
`;

const CardWrapper = styled.div.attrs({ className: 'card-wrapper' })`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  height: 70vh;
  width: 60vw;
  padding: 15px 15px 0 15px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
`;

const RelativeWrapper = styled.div.attrs({ className: 'relative-wrapper' })`
  position: relative;
  height: 100%;
  width: 100%;
`;

const DiagnoseMainLogo = styled.img.attrs({ className: 'diagnose-main-logo' })`
  height: 50px;
`;

const DiagnoseMainCard = () => (
  <DiagnoseMainCardWrapper>
    <DiagnoseMainLogo src={mainLogo} alt="mainLogo" />
    <CardWrapper>
      <RelativeWrapper>
        123
        <MainCardFooter />
      </RelativeWrapper>
    </CardWrapper>
  </DiagnoseMainCardWrapper>
);

export default DiagnoseMainCard;
