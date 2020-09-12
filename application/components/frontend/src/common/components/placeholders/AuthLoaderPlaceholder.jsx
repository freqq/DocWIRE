import React from 'react';
import styled from 'styled-components';

import mainLogo from 'images/main_logo.svg';
import threeDotsLoader from 'images/three-dots.svg';

const AuthLoaderPlaceholderWrapper = styled.div.attrs({
  className: 'auth-loader-placeholder-wrapper',
})`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #f9fafb;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  overflow: hidden;
`;

const AuthLoaderPlaceholderContainer = styled.div.attrs({
  className: 'auth-loader-placeholder-container',
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const AuthLoaderImage = styled.img.attrs({
  className: 'auth-loader-image',
})`
  display: block;
  margin: 0 auto;
  width: 65%;
  margin-bottom: 20px;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const AuthLoaderDots = styled.img.attrs({
  className: 'auth-loader-dots',
})`
  display: block;
  margin: 0 auto;
  width: 15%;
`;

const AuthLoaderPlaceholder = () => (
  <AuthLoaderPlaceholderWrapper>
    <AuthLoaderPlaceholderContainer>
      <AuthLoaderImage src={mainLogo} alt="main-logo" />
      <AuthLoaderDots src={threeDotsLoader} alt="three-dots-loadere" />
    </AuthLoaderPlaceholderContainer>
  </AuthLoaderPlaceholderWrapper>
);

export default AuthLoaderPlaceholder;
