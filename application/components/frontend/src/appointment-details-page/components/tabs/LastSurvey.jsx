import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LastSurveyWrapper = styled.div.attrs({ className: 'last-survey-wrapper' })`
  padding: 20px;
`;

const LastSurveyList = styled.ul.attrs({ className: 'last-survey-list' })`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const LastSurveyItem = styled.li.attrs({ className: 'last-survey-item' })`
  margin: 0 0 20px 0;
  padding: 0;
  display: grid;
  gap: 5px;
`;

const LastSurveyQuestion = styled.div.attrs({ className: 'last-survey-question' })`
  font-weight: 600;
  max-width: 60%;
`;

const LastSurveyAnswer = styled.div.attrs({ className: 'last-survey-answer' })`
  font-weight: 100;
`;

const LastSurvey = ({ lastSurveyData }) => (
  <LastSurveyWrapper>
    <LastSurveyList>
      {lastSurveyData.map(surveyItem => (
        <LastSurveyItem>
          <LastSurveyQuestion>{surveyItem.question}</LastSurveyQuestion>
          <LastSurveyAnswer>{surveyItem.answer}</LastSurveyAnswer>
        </LastSurveyItem>
      ))}
    </LastSurveyList>
  </LastSurveyWrapper>
);

LastSurvey.propTypes = {
  lastSurveyData: PropTypes.instanceOf(Object).isRequired,
};

export default LastSurvey;
