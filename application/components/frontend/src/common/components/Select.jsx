/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectWrapper = styled.div.attrs({ className: 'select-wrapper' })``;

const OptionWrapper = styled.div.attrs({ className: 'option-wrapper' })`
  display: inline-block;
  margin-left: 20px;
`;

const Select = ({ onChange, value, options, question }) => (
  <SelectWrapper>
    {options.map(option => (
      <OptionWrapper key={option}>
        <label htmlFor={option.question} onClick={evt => onChange(evt.target.id)}>
          <input
            type="radio"
            question={question}
            id={option.id}
            checked={parseInt(value, 10) === option.id}
          />
          {option.name}
        </label>
      </OptionWrapper>
    ))}
  </SelectWrapper>
);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
};

export default Select;
