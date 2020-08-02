import React from 'react';
import styled from 'styled-components';

import RegisterLeftSide from 'auth-page/components/RegisterLeftSide';
import LoginRightSide from 'auth-page/components/LoginRightSide';

const RegisterPageWrapper = styled.div.attrs({ className: 'register-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const RegisterPage = () => (
  <RegisterPageWrapper>
    <RegisterLeftSide />
    <LoginRightSide />
  </RegisterPageWrapper>
);

export default RegisterPage;
