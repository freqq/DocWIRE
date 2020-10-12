/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';

const SelectWrapper = styled.div.attrs({ className: 'select-wrapper' })``;

const OptionWrapper = styled.div.attrs({ className: 'option-wrapper' })`
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
`;

const Select = ({ onChange, value, options, question, customStyle }) => (
  <SelectWrapper>
    {options.map(option => (
      <OptionWrapper key={shortid()} style={customStyle}>
        <label htmlFor={option.question} onClick={() => onChange(option.name)}>
          <input type="radio" question={question} id={option.id} checked={value === option.name} />
          {option.name}
        </label>
      </OptionWrapper>
    ))}
  </SelectWrapper>
);

Select.defaultProps = {
  customStyle: {},
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  customStyle: PropTypes.instanceOf(Object),
};

export default Select;
