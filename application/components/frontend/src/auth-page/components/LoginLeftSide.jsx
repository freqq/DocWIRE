import React, { useState } from 'react';
import styled from 'styled-components';

import LoginFooter from 'auth-page/components/LoginFooter';
import TextInput from 'common/components/text-input/TextInput';
import Checkbox from 'common/components/Checkbox';
import mainLogo from 'images/main_logo.svg';

const LoginLeftSideWrapper = styled.div.attrs({ className: 'login-left-side-wrapper' })`
  font-family: 'Roboto', sans-serif;
  width: 100%;
`;

const LoginMainHeader = styled.div.attrs({ className: 'login-main-header' })`
  padding: 15px 70px;
  border-bottom: 1px solid #f0f0f0;
`;

const LoginMainContent = styled.div.attrs({ className: 'login-main-content' })`
  padding: 50px 70px 0 70px;
  height: calc(100% - 50px);
  width: calc(100% - 140px);
  position: relative;
`;

const LoginMainLogo = styled.img.attrs({ className: 'login-main-logo' })`
  height: 60px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const LoginTitle = styled.p.attrs({ className: 'login-title' })`
  font-weight: 400;
  margin: 0;
  font-size: 35px;
  color: #2e4663;
`;

const LoginSubTitle = styled.p.attrs({ className: 'login-sub-title' })`
  font-weight: 100;
  margin: 5px 0 30px 0;
  font-size: 15px;
`;

const AlreadyAccount = styled.p.attrs({ className: 'already-account' })`
  font-weight: 100;
  font-size: 14px;
`;

const ForgotPassword = styled.p.attrs({ className: 'forgot-password' })`
  margin: 0;
  text-align: right;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const UnderInuptsGrid = styled.div.attrs({ className: 'under-inputs-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 12px;
  padding: 0 0 10px 0;
  font-weight: 100;
`;

const RememberPassword = styled.div.attrs({ className: 'remember-password' })``;

const SignHere = styled.span.attrs({ className: 'sign-here' })`
  color: #2e4663;
  text-decoration: underline;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const LoginButton = styled.button.attrs({ className: 'login-button' })`
  width: 100%;
  padding: 15px 10px;
  background: #2e4663;
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoginLeftSide = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const isLoginDisabled = () => email.length === 0 || password.length === 0;

  return (
    <LoginLeftSideWrapper>
      <LoginMainHeader>
        <LoginMainLogo src={mainLogo} alt="mainLogo" />
      </LoginMainHeader>
      <LoginMainContent>
        <LoginTitle>Login</LoginTitle>
        <LoginSubTitle>Enter your credentials</LoginSubTitle>
        <TextInput
          value={email}
          onChange={evt => setEmail(evt.target.value)}
          id="email"
          type="email"
          label="Email"
        />
        <TextInput
          value={password}
          onChange={evt => setPassword(evt.target.value)}
          id="password"
          type="password"
          label="Password"
        />
        <UnderInuptsGrid>
          <RememberPassword>
            <Checkbox
              onClick={() => setRememberPassword(!rememberPassword)}
              checked={rememberPassword}
              id="remember-password"
              label="Remember password"
            />
          </RememberPassword>
          <ForgotPassword>Forgot Password</ForgotPassword>
        </UnderInuptsGrid>
        <LoginButton disabled={isLoginDisabled()}>Continue</LoginButton>
        <AlreadyAccount>
          <span>Already have an account? </span>
          <SignHere>Sign in here</SignHere>
        </AlreadyAccount>
        <LoginFooter />
      </LoginMainContent>
    </LoginLeftSideWrapper>
  );
};

export default LoginLeftSide;