import React from 'react';
import styled from 'styled-components';

import ForgotLeftSide from 'auth-page/components/ForgotLeftSide';
import LoginRightSide from 'auth-page/components/LoginRightSide';

const ForgotPasswordPageWrapper = styled.div.attrs({ className: 'forgot-password-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const ForgotPasswordPage = () => (
  <ForgotPasswordPageWrapper>
    <ForgotLeftSide />
    <LoginRightSide />
  </ForgotPasswordPageWrapper>
);

export default ForgotPasswordPage;
