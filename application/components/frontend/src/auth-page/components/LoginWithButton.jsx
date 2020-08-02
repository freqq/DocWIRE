import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoginWithButtonWrapper = styled.p.attrs({ className: 'login-with-button-wrapper' })`
  width: calc(100% - 20px);
  border-radius: 5px;
  padding: 10px;
  font-size: 11px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const ImageHelper = styled.span.attrs({ className: 'image-helper' })`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`;

const LoginWithButtonIcon = styled.img.attrs({ className: 'login-with-button-icon' })`
  height: 20px;
  margin-right: 10px;
  vertical-align: middle;
`;

const LoginWithButtonText = styled.p.attrs({ className: 'login-with-button-text' })`
  display: inline-block;
  margin: 0;
`;

const LoginWithButton = ({ text, icon, color }) => (
  <LoginWithButtonWrapper style={{ border: `1px solid ${color}`, color: `${color}` }}>
    <ImageHelper />
    <LoginWithButtonIcon src={icon} alt={text} />
    <LoginWithButtonText>{text}</LoginWithButtonText>
  </LoginWithButtonWrapper>
);

LoginWithButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.instanceOf(Object).isRequired,
};

export default LoginWithButton;
