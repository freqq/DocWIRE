import React from 'react';
import styled from 'styled-components';
import StepWizard from 'react-step-wizard';
import PropTypes from 'prop-types';

import MainCardFooter from 'initial-diagnose/components/MainCardFooter';
import ChooseSex from 'initial-diagnose/components/steps/ChooseSex';
import ChooseAge from 'initial-diagnose/components/steps/ChooseAge';
import mainLogo from 'images/main_logo.svg';

const DiagnoseMainCardWrapper = styled.div.attrs({ className: 'diagnose-main-card-wrapper' })`
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
`;

const CardWrapper = styled.div.attrs({ className: 'card-wrapper' })`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  height: 70vh;
  width: 60vw;
  padding: 15px 15px 0 15px;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
`;

const RelativeWrapper = styled.div.attrs({ className: 'relative-wrapper' })`
  position: relative;
  height: 100%;
  width: 100%;
`;

const DiagnoseMainLogo = styled.img.attrs({ className: 'diagnose-main-logo' })`
  height: 50px;
`;

const DiagnoseMainCard = ({ setCurrentStepNumber }) => (
  <DiagnoseMainCardWrapper>
    <DiagnoseMainLogo src={mainLogo} alt="mainLogo" />
    <CardWrapper>
      <RelativeWrapper>
        <StepWizard
          isHashEnabled
          nav={<MainCardFooter setCurrentStepNumber={setCurrentStepNumber} />}
        >
          <ChooseSex hashKey="choose-sex" />
          <ChooseAge hashKey="choose-age" />
        </StepWizard>
      </RelativeWrapper>
    </CardWrapper>
  </DiagnoseMainCardWrapper>
);

DiagnoseMainCard.propTypes = {
  setCurrentStepNumber: PropTypes.func.isRequired,
};

export default DiagnoseMainCard;
