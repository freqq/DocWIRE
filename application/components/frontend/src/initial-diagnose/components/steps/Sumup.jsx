import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GenericStep from 'initial-diagnose/components/GenericStep';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const MainContent = styled.div.attrs({ className: 'main-content' })``;

const SumupText = styled.p.attrs({ className: 'sumup-text' })`
  font-weight: 100;
  margin: 30px 0;
  font-size: 12px;
  text-align: center;
`;

const ErrorBlock = styled.p.attrs({ className: 'error-block' })`
  width: 80%;
  padding: 20px;
  color: #fff;
  background: #900d0d;
  border: none;
  font-size: 11px;
  text-align: center;
  margin: 0 auto;
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

const Sumup = ({ currentStep, totalSteps, isLoading, isError }) => (
  <GenericStep stepName="Sum up" currentStep={currentStep} totalSteps={totalSteps}>
    {isLoading ? (
      <ProgressIndicatorCircular />
    ) : (
      <>
        {isError ? (
          <ErrorBlock>
            There was an error while creating this appointment, try again later.
          </ErrorBlock>
        ) : (
          <MainContent>
            <SumupText>
              You were succesfully booked for an online appointment. Now wait for your doctor to
              accept this at his schedule and pay for the visit.
            </SumupText>
            <StyledLink to="/dashboard">Go to main page</StyledLink>
          </MainContent>
        )}
      </>
    )}
  </GenericStep>
);

Sumup.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

Sumup.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.diagnose.createAppointment.isFetching,
  isError: state.diagnose.createAppointment.isError,
});

export default connect(mapStateToProps, null)(Sumup);
