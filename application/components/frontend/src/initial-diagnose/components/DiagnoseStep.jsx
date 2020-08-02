/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import completedIcon from 'images/icons/completed.svg';

const DiagnoseStepWrapper = styled.div.attrs({ className: 'diagnose-step-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 10fr;
  margin: 0 0 20px 0;
  color: rgba(255, 255, 255, 0.2);
  font-family: 'Roboto', sans-serif;
`;

const DiagnoseStepNumber = styled.div.attrs({ className: 'diagnose-step-number' })`
  border-radius: 50%;
  border: 1px solid #eeedee;
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
`;

const DiagnoseStepDetails = styled.div.attrs({ className: 'diagnose-step-details' })``;

const DiagnoseStepName = styled.p.attrs({ className: 'diagnose-step-name' })`
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 400;
`;

const DiagnoseStepDescription = styled.p.attrs({ className: 'diagnose-step-description' })`
  margin: 0;
  font-weight: 100;
  font-size: 9px;
  width: 20%;
`;

const CompletedIcon = styled.img.attrs({ className: 'completed-icon' })`
  height: 12px;
  width: 12px;
  margin: 8px auto;
  display: block;
`;

const CURRENT_NUMBER_STYLE = {
  background: '#4d75a5',
  border: '1px solid #4d75a5',
  fontWeight: 'bold',
  color: '#ffffff',
};

const COMPLETED_NUMBER_STYLE = {
  background: '#2e4663',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};

const DiagnoseStep = ({ number, name, description, isCurrent, isCompleted }) => {
  const chooseNumberStyle = () => {
    if (isCurrent) return CURRENT_NUMBER_STYLE;
    if (isCompleted) return COMPLETED_NUMBER_STYLE;
    return {};
  };

  return (
    <DiagnoseStepWrapper>
      <DiagnoseStepNumber style={chooseNumberStyle()}>
        {isCompleted ? <CompletedIcon src={completedIcon} alt="completedIcon" /> : <>{number}</>}
      </DiagnoseStepNumber>
      <DiagnoseStepDetails style={isCurrent ? { color: '#ffffff' } : {}}>
        <DiagnoseStepName>{name}</DiagnoseStepName>
        <DiagnoseStepDescription>{description}</DiagnoseStepDescription>
      </DiagnoseStepDetails>
    </DiagnoseStepWrapper>
  );
};

DiagnoseStep.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default DiagnoseStep;
