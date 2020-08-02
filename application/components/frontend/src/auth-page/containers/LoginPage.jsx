import React from 'react';
import styled from 'styled-components';

import LoginLeftSide from 'auth-page/components/LoginLeftSide';
import LoginRightSide from 'auth-page/components/LoginRightSide';

const LoginPageWrapper = styled.div.attrs({ className: 'login-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 2fr 3fr;
`;

const LoginPage = () => (
  <LoginPageWrapper>
    <LoginLeftSide />
    <LoginRightSide />
  </LoginPageWrapper>
);

export default LoginPage;
