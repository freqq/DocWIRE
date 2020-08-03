import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LoginFooter from 'auth-page/components/LoginFooter';
import TextInput from 'common/components/text-input/TextInput';
import { validateEmail } from 'auth-page/components/validators';
import mainLogo from 'images/main_logo.svg';

const LoginLeftSideWrapper = styled.div.attrs({ className: 'login-left-side-wrapper' })`
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
  font-size: 30px;
  color: #2e4663;
`;

const StyledLink = styled(Link).attrs({ className: 'styled-link' })`
  color: #000;
`;

const LoginSubTitle = styled.p.attrs({ className: 'login-sub-title' })`
  font-weight: 100;
  margin: 5px 0 30px 0;
  font-size: 12px;
`;

const AlreadyAccount = styled.p.attrs({ className: 'already-account' })`
  font-weight: 100;
  font-size: 14px;
  margin-top: 30px;
  font-size: 12px;
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
  const [emailError, setEmailError] = useState(false);

  const isResetDisabled = () => email.length === 0 || emailError;

  const changeEmail = mail => {
    if (mail.length === 0) {
      setEmailError(false);
      setEmail(mail);
      return;
    }

    if (validateEmail(mail)) setEmailError(false);
    else setEmailError(true);
    setEmail(mail);
  };

  const onReset = () => {
    const resetRequest = {
      email,
    };

    console.log(resetRequest);
  };

  return (
    <LoginLeftSideWrapper>
      <LoginMainHeader>
        <Link to="/">
          <LoginMainLogo src={mainLogo} alt="mainLogo" />
        </Link>
      </LoginMainHeader>
      <LoginMainContent>
        <LoginTitle>Forgot your password ?</LoginTitle>
        <LoginSubTitle>
          Please enter the e-mail address you used when creating your account, we&apos;ll send you
          instructions to reset your password
        </LoginSubTitle>
        <TextInput
          value={email}
          onChange={evt => changeEmail(evt.target.value)}
          id="email"
          type="email"
          label="Email"
          isError={emailError}
          errorText="Email is not in correct format."
        />

        <LoginButton onClick={onReset} disabled={isResetDisabled()}>
          Send
        </LoginButton>

        <AlreadyAccount>
          <span>Remember your credentials? </span>
          <SignHere>
            <StyledLink to="/login">Login here</StyledLink>
          </SignHere>
        </AlreadyAccount>
        <LoginFooter />
      </LoginMainContent>
    </LoginLeftSideWrapper>
  );
};

export default LoginLeftSide;
