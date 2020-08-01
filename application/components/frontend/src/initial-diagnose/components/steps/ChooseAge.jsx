import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';
import Slider from 'react-rangeslider';

import 'initial-diagnose/components/steps/styles/ChooseAge.css';

const SelectedAge = styled.p.attrs({ className: 'selected-age' })`
  text-align: center;
  font-size: 20px;
  margin-bottom: 40px;
`;

const CenterWrapper = styled.div.attrs({ className: 'center-wrapper' })`
  width: 90%;
  text-align: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ManipulateButton = styled.button.attrs({ className: 'manipulate-button' })`
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  height: 40px;
  width: 40px;
  margin: auto;
  cursor: pointer;
  transition: 0.2s;
  outline: none;

  &:hover {
    background: #f0f0f0;
  }

  &:active {
    background: #c0c0c0;
  }
`;

const SliderWrapper = styled.div.attrs({ className: 'slider-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
`;

const ChooseAge = ({ currentStep, totalSteps }) => {
  const [ageValue, setAgeValue] = useState(70);

  return (
    <GenericStep stepName="Select your age" currentStep={currentStep} totalSteps={totalSteps}>
      <CenterWrapper>
        <SelectedAge>{ageValue}</SelectedAge>
        <SliderWrapper>
          <ManipulateButton onClick={() => setAgeValue(ageValue - 1)}>-</ManipulateButton>
          <Slider
            tooltip={false}
            min={18}
            max={122}
            value={ageValue}
            orientation="horizontal"
            onChange={setAgeValue}
          />
          <ManipulateButton onClick={() => setAgeValue(ageValue + 1)}>+</ManipulateButton>
        </SliderWrapper>
      </CenterWrapper>
    </GenericStep>
  );
};

ChooseAge.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default ChooseAge;
