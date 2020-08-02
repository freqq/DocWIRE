/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SearchInput from 'initial-diagnose/components/steps/components/SearchInput';
import Chip from 'initial-diagnose/components/steps/components/Chip';

const EXAMPLE_CHIPS = [
  {
    id: 1,
    content: 'Pain in right lower part of your stomach',
  },
  {
    id: 2,
    content: 'Calf pain',
  },
  {
    id: 3,
    content: 'Calf pain',
  },
  {
    id: 4,
    content: 'Calf pain',
  },
  {
    id: 5,
    content: 'Calf pain',
  },
];

const SymptomsChips = () => {
  const [chips, setChips] = useState(EXAMPLE_CHIPS);

  const onRemove = chipId => {
    const filteredArray = chips.filter(chip => chip.id !== chipId);
    setChips(filteredArray);
  };

  return (
    <div>
      <SearchInput id="symptoms-search-input" placeholder="Search, e.g. headache" />
      {chips !== null &&
        chips.map(chip => (
          <Chip key={chip.content} onRemove={onRemove} id={chip.id} content={chip.content} />
        ))}
    </div>
  );
};

export default SymptomsChips;
