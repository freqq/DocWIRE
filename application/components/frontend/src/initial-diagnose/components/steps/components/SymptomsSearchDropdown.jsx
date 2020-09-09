/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prefer-spread */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';

import bodyPartSymptoms from 'initial-diagnose/components/steps/utils/body_part_symptoms';

const SymptomsSearchDropdownWrapper = styled.div.attrs({
  className: 'symptoms-search-dropdown-wrapper',
})`
  background: #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.07);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  position: absolute;
  padding: 5px 20px;
  width: 396px;
  top: 105%;
  left: 0;
  z-index: 99999;
  height: 150px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const SymptomsList = styled.ul.attrs({ className: 'symptoms-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NotFoundSearch = styled.ul.attrs({ className: 'not-found-search' })`
  width: calc(100% - 40px);
  text-align: center;
  padding: 20px;
  font-weight: 100;
`;

const SymptomsListItem = styled.li.attrs({ className: 'symptoms-list-item' })`
  padding: 10px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const SymptomsSearchDropdown = ({ searchValue, chips, onAdd }) => {
  const allSymptoms = bodyPartSymptoms.map(a => a.symptoms);
  const flatenedArray = [].concat.apply([], allSymptoms);

  const filteredOfChosenChipsArray = flatenedArray.filter(element => !chips.includes(element));
  const filterSearchValue = [
    ...new Set(
      filteredOfChosenChipsArray.filter(element =>
        element.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    ),
  ];

  const [filteredBySearch, setFilteredBySearch] = useState(filterSearchValue);

  useEffect(() => {
    const newFlattenedArray = flatenedArray.filter(element => !chips.includes(element));
    const searchArray = [
      ...new Set(
        newFlattenedArray.filter(element =>
          element.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      ),
    ];

    setFilteredBySearch(searchArray);
  }, [searchValue, chips]);

  return (
    <SymptomsSearchDropdownWrapper>
      {filteredBySearch.length > 0 ? (
        <SymptomsList>
          {filteredBySearch.map(item => (
            <SymptomsListItem key={shortid()} onClick={() => onAdd(item)}>
              {item}
            </SymptomsListItem>
          ))}
        </SymptomsList>
      ) : (
        <NotFoundSearch>
          No symptoms found with search value: <strong>{searchValue}</strong>
        </NotFoundSearch>
      )}
    </SymptomsSearchDropdownWrapper>
  );
};

SymptomsSearchDropdown.propTypes = {
  searchValue: PropTypes.string.isRequired,
  chips: PropTypes.instanceOf(Array).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SymptomsSearchDropdown;
