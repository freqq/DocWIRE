import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import TextInput from 'common/components/text-input/TextInput';
import PasswordStrength from 'auth-page/components/PaswordStrength';
import LoginFooter from 'auth-page/components/LoginFooter';
import Checkbox from 'common/components/Checkbox';
import mainLogo from 'images/main_logo.svg';

const RegisterLeftSideWrapper = styled.div.attrs({ className: 'register-left-side-wrapper' })`
  font-family: 'Roboto', sans-serif;
  width: 100%;
`;

const LoginMainHeader = styled.div.attrs({ className: 'login-main-header' })`
  padding: 10px 70px;
  border-bottom: 1px solid #f0f0f0;
`;

const LoginMainContent = styled.div.attrs({ className: 'login-main-content' })`
  padding: 50px 70px 0 70px;
  height: calc(100% - 50px);
  width: calc(100% - 140px);
  position: relative;
  font-size: 10px;
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

const SignHere = styled.span.attrs({ className: 'sign-here' })`
  color: #2e4663;
  text-decoration: underline;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const RegisterButton = styled.button.attrs({ className: 'register-button' })`
  width: 100%;
  padding: 15px 10px;
  background: #2e4663;
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 20px;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link).attrs({ className: 'styled-link' })`
  color: #000;
`;

const AlreadyAccount = styled.p.attrs({ className: 'already-account' })`
  font-weight: 100;
  font-size: 14px;
  margin-top: 30px;
  font-size: 12px;
`;

const RegisterLeftSide = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptRules, setAcceptRules] = useState(false);

  return (
    <RegisterLeftSideWrapper>
      <LoginMainHeader>
        <LoginMainLogo src={mainLogo} alt="mainLogo" />
      </LoginMainHeader>
      <LoginMainContent>
        <LoginTitle>Register</LoginTitle>
        <LoginSubTitle>Create new account on our page</LoginSubTitle>
        <TextInput
          value={username}
          onChange={evt => setUsername(evt.target.value)}
          id="email"
          type="email"
          label="Email"
        />
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
        <TextInput
          value={confirmPassword}
          onChange={evt => setConfirmPassword(evt.target.value)}
          id="confirm-password"
          type="password"
          label="Confirm password"
        />
        <PasswordStrength password={password} />
        <Checkbox
          onClick={() => setAcceptRules(!acceptRules)}
          checked={acceptRules}
          id="accept-rules"
          label="By creating an account you agree to the terms of use and privacy policy."
        />
        <RegisterButton disabled>Create account</RegisterButton>
        <AlreadyAccount>
          <span>Already have an account? </span>
          <SignHere>
            <StyledLink to="/login">Click here</StyledLink>
          </SignHere>
        </AlreadyAccount>
        <LoginFooter />
      </LoginMainContent>
    </RegisterLeftSideWrapper>
  );
};

export default RegisterLeftSide;
