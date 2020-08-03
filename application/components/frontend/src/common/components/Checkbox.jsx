/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import 'common/components/Checkbox.css';

const Checkbox = ({ id, label, checked, onClick }) => (
  <div>
    <input type="checkbox" id={id} onClick={onClick} checked={checked} />
    <label htmlFor={id}>{label}</label>
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Checkbox;
