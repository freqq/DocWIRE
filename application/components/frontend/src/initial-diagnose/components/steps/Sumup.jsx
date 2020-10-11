import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';
import { Link } from 'react-router-dom';

const MainContent = styled.div.attrs({ className: 'main-content' })``;

const SumupText = styled.p.attrs({ className: 'sumup-text' })`
  font-weight: 100;
  margin: 30px 0;
  font-size: 12px;
  text-align: center;
`;

const StyledLink = styled(Link).attrs({ className: 'button' })`
  margin: 0 auto;
  display: block;
  padding: 15px 5px;
  width: 50%;
  text-decoration: none;
  text-align: center;
  outline: none;
  transition: 0.2s;
  color: #ffffff;
  background-color: #2d4564;
  border: none;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

const Sumup = ({ currentStep, totalSteps }) => (
  <GenericStep stepName="Sum up" currentStep={currentStep} totalSteps={totalSteps}>
    <MainContent>
      <SumupText>
        You were succesfully booked for an online appointment. Now wait for your doctor to accept
        this at his schedule and pay for the visit.
      </SumupText>
      <StyledLink to="/dashboard">Go to main page</StyledLink>
    </MainContent>
  </GenericStep>
);

Sumup.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

Sumup.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};

export default Sumup;
