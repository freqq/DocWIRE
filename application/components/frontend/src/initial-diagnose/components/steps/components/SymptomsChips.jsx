import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SearchInput from 'initial-diagnose/components/steps/components/SearchInput';
import Chip from 'initial-diagnose/components/steps/components/Chip';

const NoChipsBox = styled.div.attrs({ className: 'no-chips-box' })`
  padding: 20px;
  font-weight: 100;
  font-size: 12px;
  text-align: center;
  border-radius: 5px;
  background: #fafafa;
  margin-top: 20px;
  border: 1px solid #f0f0f0;
`;

const SymptomsChips = ({ chips, onRemove, onAdd }) => (
  <div>
    <SearchInput
      onAdd={onAdd}
      id="symptoms-search-input"
      placeholder="Search, e.g. headache"
      chips={chips}
    />
    {chips.length > 0 ? (
      chips.map(chip => <Chip key={chip} onRemove={onRemove} id={chip} content={chip} />)
    ) : (
      <NoChipsBox>Please try to add atleast one symptom.</NoChipsBox>
    )}
  </div>
);

SymptomsChips.propTypes = {
  chips: PropTypes.instanceOf(Array).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SymptomsChips;
