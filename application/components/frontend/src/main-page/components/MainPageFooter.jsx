import React from 'react';
import styled from 'styled-components';

const MainPageFooterWrapper = styled.footer.attrs({ className: 'main-page-footer' })`
  margin-top: 40px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  height: 20px;
  text-align: center;

  @media only screen and (max-width: 730px) {
    margin-top: 20px;
  }
`;

const FooterLeft = styled.span.attrs({ className: 'footer-left' })`
  text-align: left;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  text-transform: uppercase;
  margin-right: 10px;
`;

const FooterRight = styled.span.attrs({ className: 'footer-right' })`
  text-align: right;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
  line-height: 20px;
`;

const MainPageFooter = () => (
  <MainPageFooterWrapper>
    <FooterLeft>DocWire.com</FooterLeft>
    <FooterRight>&copy; copyright 2020. All rights reserved</FooterRight>
  </MainPageFooterWrapper>
);

export default MainPageFooter;
