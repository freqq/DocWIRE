import React from 'react';
import styled from 'styled-components';

const LoginFooterWrapper = styled.p.attrs({ className: 'login-footer-wrapper' })`
  width: 100%;
  font-size: 12px;
  margin-top: 20px;
  font-weight: 100;
  color: #2e4663;
  text-align: center;
  bottom: 150px;
  margin-top: 50px;
`;

const LoginFooter = () => <LoginFooterWrapper>&copy; 2020 DOCWIRE.com</LoginFooterWrapper>;

export default LoginFooter;
