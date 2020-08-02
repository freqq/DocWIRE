import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';
import doctorWoman from 'images/icons/doctor-woman.svg';

const IntroductionGridWrapper = styled.div.attrs({ className: 'introduction-grid-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 40px;
  width: 80%;
  margin: 0 auto;
`;

const IntroductionLogo = styled.div.attrs({ className: 'introduction-logo' })``;
const IntroductionImage = styled.img.attrs({ className: 'introduction-image' })`
  height: 340px;
`;

const IntroductionContent = styled.div.attrs({ className: 'introduction-content' })``;

const MainContent = styled.p.attrs({ className: 'main-content' })`
  font-weight: 400;
  margin: 0;
  font-size: 30px;
`;

const SubContent = styled.p.attrs({ className: 'sub-content' })`
  font-weight: 100;
  font-size: 14px;
`;

const Introduction = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Introduction" currentStep={currentStep} totalSteps={totalSteps}>
    <IntroductionGridWrapper>
      <IntroductionLogo>
        <IntroductionImage src={doctorWoman} alt="doctorWoman" />
      </IntroductionLogo>
      <IntroductionContent>
        <MainContent>Hello!</MainContent>
        <SubContent>
          You’re about to use a short (3 min), safe and anonymous health checkup. Your answers will
          be carefully analyzed and you’ll learn about possible causes of your symptoms.
        </SubContent>
      </IntroductionContent>
    </IntroductionGridWrapper>
  </GenericStep>
);

Introduction.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

Introduction.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};

export default Introduction;
