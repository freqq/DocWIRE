import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getQuestionContent } from 'appointment-details-page/utils/quickSurveyItems';

const QuickSurveyWrapper = styled.div.attrs({ className: 'quick-survey-wrapper' })`
  padding: 20px;
`;

const QuickSurveyList = styled.ul.attrs({ className: 'quick-survey-list' })`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const QuickSurveyItem = styled.li.attrs({ className: 'quick-survey-item' })`
  margin: 0 0 15px 0;
  padding: 0;
  display: grid;
  gap: 5px;
`;

const QuickSurveyQuestion = styled.div.attrs({ className: 'quick-survey-question' })`
  font-weight: 600;
`;

const QuickSurveyAnswer = styled.div.attrs({ className: 'quick-survey-answer' })`
  font-weight: 100;
`;

const QuickSurvey = ({ quickSurveyData }) => (
  <QuickSurveyWrapper>
    <QuickSurveyList>
      {Object.keys(quickSurveyData).map(key => (
        <QuickSurveyItem>
          <QuickSurveyQuestion>{getQuestionContent(key)}</QuickSurveyQuestion>
          <QuickSurveyAnswer>{quickSurveyData[key]}</QuickSurveyAnswer>
        </QuickSurveyItem>
      ))}
    </QuickSurveyList>
  </QuickSurveyWrapper>
);

QuickSurvey.propTypes = {
  quickSurveyData: PropTypes.instanceOf(Object).isRequired,
};

export default QuickSurvey;
