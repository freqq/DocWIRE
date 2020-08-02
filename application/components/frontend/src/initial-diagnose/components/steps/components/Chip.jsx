import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChipWrapper = styled.div.attrs({ className: 'chip-wrapper' })`
  display: inline-block;
  background: #2e4663;
  border-radius: 15px;
  color: #fffff;
  font-size: 10px;
  color: #ffffff;
  height: 30px;
  line-height: 30px;
  padding: 3px 15px;
  margin: 10px 10px 0 0;
`;

const ChipContent = styled.span.attrs({ className: 'chip-content' })`
  display: inline-block;
`;

const RemoveIcon = styled.div.attrs({ className: 'remove-icon' })`
  border-radius: 50%;
  float: right;
  background: #416188;
  transition: 0.2s;
  width: 20px;
  text-align: center;
  line-height: 20px;
  height: 20px;
  cursor: pointer;
  display: inline-block;
  margin: 5px 0 0 15px;

  &:hover {
    opacity: 0.6;
  }
`;

const Chip = ({ id, content, onRemove }) => (
  <ChipWrapper>
    <ChipContent>{content}</ChipContent>
    <RemoveIcon onClick={() => onRemove(id)}>X</RemoveIcon>
  </ChipWrapper>
);

Chip.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Chip;
