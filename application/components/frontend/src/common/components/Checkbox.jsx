/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, label, checked, onClick }) => (
  <label htmlFor={id}>
    <input type="checkbox" id={id} checked={checked} onClick={onClick} />
    <span>{label}</span>
  </label>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Checkbox;
