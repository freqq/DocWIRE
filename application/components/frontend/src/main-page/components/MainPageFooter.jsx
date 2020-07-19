import React from 'react';
import styled from 'styled-components';

const MainPageFooterWrapper = styled.footer.attrs({ className: 'main-page-footer' })`
  text-align: center;
  font-size: 12px;
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, 0);
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`;

const MainPageFooter = () => <MainPageFooterWrapper>2020 &copy; docwire.com</MainPageFooterWrapper>;

export default MainPageFooter;
