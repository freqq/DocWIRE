import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GenericStep from 'initial-diagnose/components/GenericStep';
import SymptomsChips from 'initial-diagnose/components/steps/components/SymptomsChips';
import HumanModel from 'initial-diagnose/components/steps/components/HumanModel';

const SymptomsDescription = styled.p.attrs({ className: 'symptoms-description' })`
  text-align: center;
  font-size: 15px;
  margin-bottom: 40px;
  font-weight: 100;
  margin: 0;
`;

const SymptomsGrid = styled.p.attrs({ className: 'symptoms-grid' })`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  width: 80%;
  margin: 20px auto 0 auto;
`;

const Symptoms = ({ currentStep, totalSteps, setChosenSymptoms, chosenSymptoms }) => {
  const onRemove = symptomToRemove => {
    const filteredArray = chosenSymptoms.filter(symptom => symptom !== symptomToRemove);
    setChosenSymptoms(filteredArray);
  };

  const onAdd = newSymptom => {
    if (!chosenSymptoms.some(item => item === newSymptom))
      setChosenSymptoms([...chosenSymptoms, newSymptom]);
  };

  return (
    <GenericStep stepName="Symptoms" currentStep={currentStep} totalSteps={totalSteps}>
      <SymptomsDescription>Please use the search or click on the body model.</SymptomsDescription>
      <SymptomsGrid>
        <SymptomsChips onRemove={onRemove} chips={chosenSymptoms} />
        <HumanModel onAdd={onAdd} chosenSymptoms={chosenSymptoms} />
      </SymptomsGrid>
    </GenericStep>
  );
};

Symptoms.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

Symptoms.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  chosenSymptoms: PropTypes.instanceOf(Array).isRequired,
  setChosenSymptoms: PropTypes.func.isRequired,
};

export default Symptoms;
