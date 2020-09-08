import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';
import Slider from 'react-rangeslider';

import 'initial-diagnose/components/steps/styles/ChooseAge.css';

const SelectedAge = styled.p.attrs({ className: 'selected-age' })`
  text-align: center;
  font-size: 20px;
  margin-bottom: 40px;
  font-weight: 100;
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

const MIN_AGE = 18;
const MAX_AGE = 122;

const ChooseAge = ({ currentStep, totalSteps, chosenAge, setChosenAge }) => {
  const onAgeAdd = () => {
    if (chosenAge < MAX_AGE) setChosenAge(chosenAge + 1);
  };

  const onAgeRemove = () => {
    if (chosenAge > MIN_AGE) setChosenAge(chosenAge - 1);
  };

  return (
    <GenericStep stepName="Select your age" currentStep={currentStep} totalSteps={totalSteps}>
      <CenterWrapper>
        <SelectedAge>{`Age: ${chosenAge}`}</SelectedAge>
        <SliderWrapper>
          <ManipulateButton onClick={onAgeRemove}>-</ManipulateButton>
          <Slider
            tooltip={false}
            min={MIN_AGE}
            max={MAX_AGE}
            value={chosenAge}
            orientation="horizontal"
            onChange={setChosenAge}
          />
          <ManipulateButton onClick={onAgeAdd}>+</ManipulateButton>
        </SliderWrapper>
      </CenterWrapper>
    </GenericStep>
  );
};

ChooseAge.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

ChooseAge.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  setChosenAge: PropTypes.func.isRequired,
  chosenAge: PropTypes.number.isRequired,
};

export default ChooseAge;
