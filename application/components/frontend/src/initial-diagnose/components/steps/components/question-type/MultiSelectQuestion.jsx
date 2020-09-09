import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MultiSelect from 'common/components/MultiSelect';

const MultiSelectQuestionWrapper = styled.span.attrs({
  className: 'multi-select-question-wrapper',
})`
  display: block;
  margin: 0 auto;
  width: 80%;
`;

const MultiSelectQuestion = ({ questionBody, value, setter, question }) => (
  <MultiSelectQuestionWrapper>
    <MultiSelect
      options={questionBody.answers}
      value={value}
      onChange={setter}
      question={question}
    />
  </MultiSelectQuestionWrapper>
);

MultiSelectQuestion.propTypes = {
  questionBody: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
};

export default MultiSelectQuestion;
