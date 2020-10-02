import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToogleSwitchWrapper = styled.div.attrs({ className: 'toogle-switch-wrapper' })``;

const ToggleLabel = styled.label.attrs({ className: 'toogle-label' })`
  position: relative;
  display: inline-block;
  width: 30px;
  margin: auto 0;
  height: 17px;
`;

const SpanComponent = styled.span.attrs({ className: 'span-component slider' })`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 17px;

  &:before {
    position: absolute;
    content: '';
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const InputComponent = styled.input.attrs({ className: 'input-component' })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #2f608e;
  }

  &:focus + .slider {
    box-shadow: 0 0 1px #2f608e;
  }

  &:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
`;

const ToggleSwitch = ({ style, name, isChecked, onCheck }) => (
  <ToogleSwitchWrapper style={style}>
    <ToggleLabel>
      <InputComponent name={name} type="checkbox" checked={isChecked} onClick={onCheck} />
      <SpanComponent />
    </ToggleLabel>
  </ToogleSwitchWrapper>
);

ToggleSwitch.defaultProps = {
  isChecked: false,
  name: '',
  style: {},
};

ToggleSwitch.propTypes = {
  style: PropTypes.instanceOf(Object),
  onCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
  name: PropTypes.string,
};

export default ToggleSwitch;
