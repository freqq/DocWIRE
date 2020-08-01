import React from 'react';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';

const ChooseAge = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Choose age" currentStep={currentStep} totalSteps={totalSteps}>
    ChooseAge
  </GenericStep>
);

ChooseAge.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default ChooseAge;
