import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';

import Select from 'common/components/Select';

const AnswerRowWrapper = styled.li.attrs({ className: 'answer-row-wrapper' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 15px 10px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

const AnswerContent = styled.div.attrs({ className: 'answer-content' })``;

const AnswerOptions = styled.div.attrs({ className: 'answer-options' })`
  text-align: right;
`;

const OPTIONS = [
  { id: shortid(), name: 'Yes' },
  { id: shortid(), name: 'No' },
  { id: shortid(), name: `Don't know` },
];

const AnswerRow = ({ question, value, setter }) => (
  <AnswerRowWrapper>
    <AnswerContent>{question}</AnswerContent>
    <AnswerOptions>
      <Select options={OPTIONS} value={value} onChange={setter} question={question} />
    </AnswerOptions>
  </AnswerRowWrapper>
);

AnswerRow.propTypes = {
  question: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Object).isRequired,
  setter: PropTypes.func.isRequired,
};

export default AnswerRow;
