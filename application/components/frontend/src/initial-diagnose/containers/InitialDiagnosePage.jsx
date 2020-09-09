import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DiagnoseLeftSide from 'initial-diagnose/components/DiagnoseLeftSide';
import DiagnoseRightSide from 'initial-diagnose/components/DiagnoseRightSide';
import steps from 'initial-diagnose/utils/steps';

const InitialDiagnosePageWrapper = styled.div.attrs({ className: 'initial-diagnose-page-wrapper' })`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 5fr 2fr;
`;

const InitialDiagnosePage = () => {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);

  useEffect(() => {
    const browserUrl = window.location.href;
    const stepName = browserUrl.split('#')[1];

    if (stepName !== undefined && stepName.length > 0) {
      steps.forEach(step => {
        if (step.url === stepName) setCurrentStepNumber(step.number);
      });
    }
  }, []);

  return (
    <InitialDiagnosePageWrapper>
      <DiagnoseLeftSide setCurrentStepNumber={setCurrentStepNumber} />
      <DiagnoseRightSide steps={steps} currentStepNumber={currentStepNumber} />
    </InitialDiagnosePageWrapper>
  );
};

export default InitialDiagnosePage;
