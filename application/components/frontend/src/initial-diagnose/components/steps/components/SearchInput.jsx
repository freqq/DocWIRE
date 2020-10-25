import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SymptomsSearchDropdown from 'initial-diagnose/components/steps/components/SymptomsSearchDropdown';

import searchIcon from 'images/icons/search.svg';

const SearchInputWrapper = styled.div.attrs({ className: 'search-input-wrapper' })``;

const InputWrapper = styled.div.attrs({ className: 'input-wrapper' })`
  width: 100%;
  position: relative;
`;

const InputComponent = styled.input.attrs({ className: 'input-component' })`
  border-radius: 3px;
  border: 1px solid #f0f0f0;
  outline: none;
  padding: 15px 45px 15px 25px;
  font-size: 11px;
  width: calc(100% - 70px);
`;

const SearchIcon = styled.img.attrs({ className: 'search-icon' })`
  position: absolute;
  top: 16px;
  right: 15px;
  height: 12px;
  cursor: pointer;
`;

const SearchInput = ({ id, placeholder, onAdd, chips }) => {
  const [searchValue, setSearchValue] = useState('');

  const onAddFunction = item => {
    setSearchValue('');
    onAdd(item);
  };

  return (
    <SearchInputWrapper>
      <InputWrapper>
        <InputComponent
          autoComplete="false"
          placeholder={placeholder}
          value={searchValue}
          onChange={evt => setSearchValue(evt.target.value)}
          id={id}
        />
        <SearchIcon src={searchIcon} alt="searchIcon" />
        {searchValue.length > 0 && (
          <SymptomsSearchDropdown searchValue={searchValue} onAdd={onAddFunction} chips={chips} />
        )}
      </InputWrapper>
    </SearchInputWrapper>
  );
};

SearchInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  chips: PropTypes.instanceOf(Array).isRequired,
};

export default SearchInput;
