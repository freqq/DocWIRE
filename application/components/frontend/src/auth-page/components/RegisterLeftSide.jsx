import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import zxcvbn from 'zxcvbn';

import TextInput from 'common/components/text-input/TextInput';
import PasswordStrength from 'auth-page/components/PaswordStrength';
import LoginFooter from 'auth-page/components/LoginFooter';
import { validateUsername, validateEmail } from 'auth-page/components/validators';
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
  padding: 10px 70px 0 70px;
  height: calc(100% - 50px);
  width: calc(100% - 140px);
  position: relative;
  font-size: 10px;
  font-weight: 100;
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
  margin: 5px 0 10px 0;
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

const ReCAPTCHAContainer = styled.div.attrs({ className: 'recaptcha-container' })`
  transform: scale(0.77);
  -webkit-transform: scale(0.77);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  margin-top: 20px;
`;

const AlreadyAccount = styled.p.attrs({ className: 'already-account' })`
  font-weight: 100;
  font-size: 14px;
  margin-top: 30px;
  font-size: 12px;
`;

const RegisterLeftSide = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [acceptRules, setAcceptRules] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false);

  const changeUsername = name => {
    if (name.length === 0) {
      setUsernameError(false);
      setUsername(name);
      return;
    }

    if (validateUsername(name)) setUsernameError(false);
    else setUsernameError(true);
    setUsername(name);
  };

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

  const changePassword = pass => {
    if (pass.length === 0) {
      setPasswordError(false);
      setPassword(pass);
      return;
    }

    if (zxcvbn(pass).score >= 3 && pass.length > 7) setPasswordError(false);
    else setPasswordError(true);
    setPassword(pass);
  };

  const changeConfirmPassword = confPassword => {
    if (confPassword.length === 0) {
      setConfirmPasswordError(false);
      setConfirmPassword(confPassword);
      return;
    }

    if (confPassword === password) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(confPassword);
  };

  const onRegister = () => {
    const registerRequest = {
      username,
      email,
      password,
    };

    console.log(registerRequest);
  };

  const onCaptchaChange = () => setIsCaptcha(true);

  const onCaptchaExpire = () => setIsCaptcha(false);

  const isRegisterEnabled = () =>
    username.length > 0 &&
    !usernameError &&
    email.length > 0 &&
    !emailError &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    !confirmPasswordError &&
    acceptRules &&
    isCaptcha;

  return (
    <RegisterLeftSideWrapper>
      <LoginMainHeader>
        <Link to="/">
          <LoginMainLogo src={mainLogo} alt="mainLogo" />
        </Link>
      </LoginMainHeader>
      <LoginMainContent>
        <LoginTitle>Register</LoginTitle>
        <LoginSubTitle>Create new account on our page</LoginSubTitle>
        <TextInput
          value={username}
          onChange={evt => changeUsername(evt.target.value)}
          id="username"
          type="text"
          label="Username"
          isError={usernameError}
          errorText="Username is not correct."
        />
        <TextInput
          value={email}
          onChange={evt => changeEmail(evt.target.value)}
          id="email"
          type="email"
          label="Email"
          isError={emailError}
          errorText="Email is not in correct format."
        />
        <PasswordStrength password={password} />
        <TextInput
          value={password}
          onChange={evt => changePassword(evt.target.value)}
          id="password"
          type="password"
          label="Password"
          isError={passwordError}
        />
        <TextInput
          value={confirmPassword}
          onChange={evt => changeConfirmPassword(evt.target.value)}
          id="confirm-password"
          type="password"
          label="Confirm password"
          isError={confirmPasswordError}
          errorText="Passwords don't match."
        />
        <Checkbox
          onClick={() => setAcceptRules(!acceptRules)}
          checked={acceptRules}
          id="accept-rules"
          label="By creating an account you agree to the terms of use and privacy policy."
        />
        <ReCAPTCHAContainer>
          <ReCAPTCHA
            onChange={onCaptchaChange}
            onExpired={onCaptchaExpire}
            onErrored={onCaptchaExpire}
            theme="light"
            sitekey="6Lda3bkZAAAAAHrbrhLK8lMp18pmkYqRkOCzEH-j"
          />
        </ReCAPTCHAContainer>

        <RegisterButton onClick={onRegister} disabled={!isRegisterEnabled()}>
          Create account
        </RegisterButton>
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
