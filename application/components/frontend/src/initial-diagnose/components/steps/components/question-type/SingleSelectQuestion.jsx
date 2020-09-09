import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from 'common/components/Select';

const SingleSelectQuestionWrapper = styled.div.attrs({
  className: 'single-select-question-wrapper',
})`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

const CUSTOM_OPTION_STYLE = {
  display: 'block',
  marginTop: '25px',
  fontSize: '14px',
};

const SingleSelectQuestion = ({ questionBody, value, setter, question }) => (
  <SingleSelectQuestionWrapper>
    <Select
      options={questionBody.answers}
      value={value}
      onChange={setter}
      question={question}
      customStyle={CUSTOM_OPTION_STYLE}
    />
  </SingleSelectQuestionWrapper>
);

SingleSelectQuestion.propTypes = {
  questionBody: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
};

export default SingleSelectQuestion;
