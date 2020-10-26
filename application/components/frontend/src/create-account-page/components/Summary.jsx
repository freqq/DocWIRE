import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const SummaryWrapper = styled.div.attrs({ className: 'summary-wrapper' })`
  margin-top: 180px;
`;

const Title = styled.div.attrs({ className: 'title' })`
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Box = styled.div.attrs({ className: 'box' })`
  width: 50%;
  text-align: center;
  margin: 0 auto;
  padding: 25px 15px;
  border: 1px solid #f0f0f0;
  font-size: 12px;
  font-weight: 100;
  border-radius: 4px;
`;

const SuccessBox = styled(Box).attrs({ className: 'success-box' })`
  background: #91d18b;
  color: #000 !important;
`;

const ErrorBox = styled(Box).attrs({ className: 'error-box' })`
  background: #ff7070;
  color: #000 !important;
`;

const SummaryText = styled.div.attrs({ className: 'summary-text' })`
  text-align: center;
  width: 100%;
  font-size: 14px;
`;

const StyledLink = styled(Link).attrs({ className: 'styled-link' })`
  background: #2d4564;
  color: #fff;
  outline: none;
  text-decoration: none;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  text-align: center;
  display: block;
  margin: 20px auto 0 auto;
  width: 40%;
  font-size: 12px;
  font-weight: 100;
`;

const PatientSummary = styled.div.attrs({ className: 'patient-summary' })`
  width: 80%;
  margin: 20px auto 0 auto;
`;
const DoctorSummary = styled.div.attrs({ className: 'doctor-summary' })`
  width: 80%;
  margin: 20px auto 0 auto;
`;

const Summary = ({ accountType, createLoading, createError }) => {
  const shouldShowForPatient = () => accountType === 'PATIENT';

  return (
    <SummaryWrapper>
      <Title>Summary</Title>
      {createLoading ? (
        <ProgressIndicatorCircular />
      ) : (
        <>
          {createError ? (
            <ErrorBox>
              There was an error during creation of your account, try again later!
            </ErrorBox>
          ) : (
            <>
              <SuccessBox>Account updated successfully!</SuccessBox>
              {shouldShowForPatient() ? (
                <PatientSummary>
                  <SummaryText>Now it&apos;s time for a mandatory inital diagnose</SummaryText>
                  <StyledLink to="/diagnose">Go to diagnose</StyledLink>
                </PatientSummary>
              ) : (
                <DoctorSummary>
                  <SummaryText>Go ahead and checkout an app dashboard</SummaryText>
                  <StyledLink to="/dashboard">Go to dashboard</StyledLink>
                </DoctorSummary>
              )}
            </>
          )}
        </>
      )}
    </SummaryWrapper>
  );
};

const mapStateToProps = state => ({
  createLoading: state.common.accountData.createLoading,
  createError: state.common.accountData.createError,
});

Summary.propTypes = {
  accountType: PropTypes.string.isRequired,
  createLoading: PropTypes.bool.isRequired,
  createError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Summary);
