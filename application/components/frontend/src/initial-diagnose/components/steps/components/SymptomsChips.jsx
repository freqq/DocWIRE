import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from 'initial-diagnose/components/steps/components/SearchInput';
import Chip from 'initial-diagnose/components/steps/components/Chip';

const SymptomsChips = ({ chips, onRemove }) => (
  <div>
    <SearchInput id="symptoms-search-input" placeholder="Search, e.g. headache" />
    {chips !== null &&
      chips.map(chip => (
        <Chip key={chip.content} onRemove={onRemove} id={chip.id} content={chip.content} />
      ))}
  </div>
);

SymptomsChips.propTypes = {
  chips: PropTypes.instanceOf(Array).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SymptomsChips;
