import React, { useState } from 'react';
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

const EXAMPLE_CHIPS = [
  {
    id: 1,
    content: 'Pain in right lower part of your stomach',
  },
  {
    id: 2,
    content: 'Calf pain',
  },
  {
    id: 3,
    content: 'Penis pain',
  },
  {
    id: 4,
    content: 'Hurting your arse',
  },
  {
    id: 5,
    content: 'Haha lol what is this',
  },
];

const Symptoms = ({ currentStep, totalSteps }) => {
  const [chips, setChips] = useState(EXAMPLE_CHIPS);

  const onRemove = chipId => {
    const filteredArray = chips.filter(chip => chip.id !== chipId);
    setChips(filteredArray);
  };

  const onAdd = chip => {
    setChips([...chips, chip]);
  };

  return (
    <GenericStep stepName="Symptoms" currentStep={currentStep} totalSteps={totalSteps}>
      <SymptomsDescription>Please use the search or click on the body model.</SymptomsDescription>
      <SymptomsGrid>
        <SymptomsChips onRemove={onRemove} chips={chips} />
        <HumanModel onAdd={onAdd} />
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
};

export default Symptoms;
