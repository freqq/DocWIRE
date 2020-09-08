import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GenericStep from 'initial-diagnose/components/GenericStep';

import femaleIcon from 'images/icons/female.svg';
import maleIcon from 'images/icons/male.svg';

const ChooseSexCards = styled.div.attrs({ className: 'choose-sex-cards' })`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SexCard = styled.div.attrs({ className: 'sex-card' })`
  font-size: 50px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  display: inline-block;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  margin: 0 10px;
  transition: 0.2s;
  cursor: pointer;
  width: 20%;
  padding: 50px 0;

  &:hover {
    background: #f0f0f0;
    opacity: 0.6;
  }
`;

const SexIcon = styled.img.attrs({ className: 'sex-icon' })`
  height: 40px;
`;

const SexName = styled.p.attrs({ className: 'sex-name' })`
  font-size: 10px;
`;

const SEX_OPTIONS = [
  {
    name: 'Female',
    icon: femaleIcon,
  },
  {
    name: 'Male',
    icon: maleIcon,
  },
];

const CHOSEN_CARD_STYLE = {
  background: '#f0f0f0',
  opacity: '0.6',
};

const ChooseSex = ({
  currentStep,
  totalSteps,
  nextStep,
  setCurrentStepNumber,
  setChosenSex,
  chosenSex,
}) => {
  const selectSex = sexName => {
    setChosenSex(sexName);
    setCurrentStepNumber(currentStep + 1);
    nextStep();
  };

  return (
    <GenericStep stepName="Choose sex" currentStep={currentStep} totalSteps={totalSteps}>
      <ChooseSexCards>
        {SEX_OPTIONS.map(sex => (
          <SexCard
            style={chosenSex === sex.name ? CHOSEN_CARD_STYLE : {}}
            key={sex.name}
            onClick={() => selectSex(sex.name)}
          >
            <SexIcon src={sex.icon} />
            <SexName>{sex.name}</SexName>
          </SexCard>
        ))}
      </ChooseSexCards>
    </GenericStep>
  );
};

ChooseSex.defaultProps = {
  currentStep: null,
  totalSteps: null,
  nextStep: null,
};

ChooseSex.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  nextStep: PropTypes.func,
  setCurrentStepNumber: PropTypes.func.isRequired,
  setChosenSex: PropTypes.func.isRequired,
  chosenSex: PropTypes.string.isRequired,
};

export default ChooseSex;
