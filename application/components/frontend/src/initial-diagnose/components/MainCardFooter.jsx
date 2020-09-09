import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainCardFooterWrapper = styled.div.attrs({ className: 'main-card-footer-wrapper' })`
  position: absolute;
  bottom: 15px;
  padding: 10px;
  width: calc(100% - 20px);
  border-top: 1px solid #f0f0f0;
  z-index: 999999;
`;

const FooterButton = styled.button`
  padding: 15px 25px;
  outline: none;
  border: none;
  border-radius: 2px;
  font-size: 10px;
  float: right;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const SelectAnswer = styled.span.attrs({ className: 'select-answer' })`
  padding: 15px 25px;
  display: inline-block;
  font-size: 10px;
  float: right;
`;

const NextStepButton = styled(FooterButton).attrs({ className: 'next-step-button' })`
  background: #2e4663;
  color: #ffffff;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const PreviousStepButton = styled(FooterButton).attrs({ className: 'previous-step-button' })`
  background: #ffffff;
  color: #2e4663;
`;

const MainCardFooter = ({
  currentStep,
  previousStep,
  nextStep,
  setCurrentStepNumber,
  isQuickSurveyBlocked,
  isSymptomsBlocked,
  isRegionsBlocked,
}) => {
  const goForward = () => {
    setCurrentStepNumber(currentStep + 1);
    nextStep();
  };

  const goBack = () => {
    setCurrentStepNumber(currentStep - 1);
    previousStep();
  };

  const shouldBlockQuickSurvey = () => currentStep === 4 && isQuickSurveyBlocked();

  const shouldBlockSymptoms = () => currentStep === 5 && isSymptomsBlocked();

  const shouldBlockVisitedRegions = () => currentStep === 6 && isRegionsBlocked();

  return (
    <MainCardFooterWrapper>
      {currentStep === 2 ? (
        <SelectAnswer>Select an answer above</SelectAnswer>
      ) : (
        <>
          {currentStep !== 7 && (
            <NextStepButton
              onClick={goForward}
              disabled={
                shouldBlockQuickSurvey() || shouldBlockSymptoms() || shouldBlockVisitedRegions()
              }
            >
              {currentStep === 7 ? 'Submit' : <>Next step &gt;</>}
            </NextStepButton>
          )}
        </>
      )}
      {currentStep !== 1 && (
        <PreviousStepButton onClick={goBack}>&lt; Previous step</PreviousStepButton>
      )}
    </MainCardFooterWrapper>
  );
};

MainCardFooter.defaultProps = {
  currentStep: null,
  previousStep: null,
  nextStep: null,
};

MainCardFooter.propTypes = {
  currentStep: PropTypes.number,
  previousStep: PropTypes.func,
  nextStep: PropTypes.func,
  setCurrentStepNumber: PropTypes.func.isRequired,
  isQuickSurveyBlocked: PropTypes.func.isRequired,
  isSymptomsBlocked: PropTypes.func.isRequired,
  isRegionsBlocked: PropTypes.func.isRequired,
};

export default MainCardFooter;
