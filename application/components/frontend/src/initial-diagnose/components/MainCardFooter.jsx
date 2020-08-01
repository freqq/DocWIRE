import React from 'react';
import styled from 'styled-components';

const MainCardFooterWrapper = styled.div.attrs({ className: 'main-card-footer-wrapper' })`
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: calc(100% - 20px);
  border-top: 1px solid #f0f0f0;
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

const NextStepButton = styled(FooterButton).attrs({ className: 'next-step-button' })`
  background: #2e4663;
  color: #ffffff;
`;

const PreviousStepButton = styled(FooterButton).attrs({ className: 'previous-step-button' })`
  background: #ffffff;
  color: #2e4663;
`;

const MainCardFooter = () => {
  return (
    <MainCardFooterWrapper>
      <NextStepButton>Next step &gt;</NextStepButton>
      <PreviousStepButton>&lt; Previous step</PreviousStepButton>
    </MainCardFooterWrapper>
  );
};

export default MainCardFooter;
