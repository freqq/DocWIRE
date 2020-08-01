/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import DiagnoseLeftSide from 'initial-diagnose/components/DiagnoseLeftSide';
import DiagnoseRightSide from 'initial-diagnose/components/DiagnoseRightSide';

const InitialDiagnosePageWrapper = styled.div.attrs({ className: 'initial-diagnose-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 5fr 2fr;
`;

const STEPS = [
  {
    number: 1,
    name: 'Choose your sex',
    description:
      'In order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your moma',
  },
  {
    number: 2,
    name: 'Select your age',
    description:
      'In order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your moma',
  },
  {
    number: 3,
    name: 'Quick survey',
    description:
      'In order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your moma',
  },
  {
    number: 4,
    name: 'Symptoms',
    description:
      'In order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your moma',
  },
  {
    number: 5,
    name: 'Regions you visited',
    description:
      'In order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your moma',
  },
  {
    number: 6,
    name: 'Few more questions',
    description:
      'In order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your moma',
  },
  {
    number: 7,
    name: 'Results',
    description:
      'In order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your momaIn order to magnifiy your moma',
  },
];

const InitialDiagnosePage = () => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);

  return (
    <InitialDiagnosePageWrapper>
      <DiagnoseLeftSide setCurrentStepNumber={setCurrentStepNumber} />
      <DiagnoseRightSide steps={STEPS} currentStepNumber={currentStepNumber} />
    </InitialDiagnosePageWrapper>
  );
};

export default InitialDiagnosePage;
