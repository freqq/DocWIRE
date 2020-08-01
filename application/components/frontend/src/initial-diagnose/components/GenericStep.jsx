import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StepWrapper = styled.div.attrs({ className: 'step-wrapper' })``;

const CardTitle = styled.p.attrs({ className: 'card-title' })`
  width: 100%;
  font-size: 50px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  margin-top: 10px;
`;

const StepNumber = styled.p.attrs({ className: 'step-number' })`
  width: 100%;
  font-size: 12px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`;

const GenericStep = ({ currentStep, totalSteps, stepName, children }) => (
  <StepWrapper>
    <StepNumber>{`STEP ${currentStep}/${totalSteps}`}</StepNumber>
    <CardTitle>{stepName}</CardTitle>
    {children}
  </StepWrapper>
);

GenericStep.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  stepName: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default GenericStep;
