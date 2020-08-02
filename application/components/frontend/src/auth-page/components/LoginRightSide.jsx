import React from 'react';
import styled from 'styled-components';

import loginPageImage from 'images/login_page_bg.svg';

const LoginRightSideWrapper = styled.div.attrs({ className: 'login-right-side-wrapper' })`
  background: #2e4663;
`;

const LoginPageImage = styled.img.attrs({ className: 'login-page-image' })`
  height: 70vh;
`;

const LoginRightSide = () => (
  <LoginRightSideWrapper>
    <LoginPageImage src={loginPageImage} alt="loginPageImage" />
  </LoginRightSideWrapper>
);

export default LoginRightSide;
