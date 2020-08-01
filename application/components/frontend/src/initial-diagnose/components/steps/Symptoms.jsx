import React from 'react';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';

const Symptoms = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Symptoms" currentStep={currentStep} totalSteps={totalSteps}>
    Symptoms
  </GenericStep>
);

Symptoms.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default Symptoms;
