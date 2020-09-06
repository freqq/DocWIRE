import React, { useState } from 'react';
import styled from 'styled-components';

import SearchDropdown from 'common/components/layout/navbar/SearchDropdown';
import searchIcon from 'images/icons/search.svg';

const SearchBarWrapper = styled.div.attrs({ className: 'search-bar-wrapper' })`
  display: inline-block;
  position: relative;
`;

const InputWrapper = styled.div.attrs({ className: 'input-wrapper' })`
  width: 400px;
  position: relative;
`;

const SearchIcon = styled.img.attrs({ className: 'search-icon' })`
  position: absolute;
  top: 20px;
  right: 10px;
  height: 12px;
  cursor: pointer;
`;

const StyledSearchInput = styled.input.attrs({ className: 'styled-search-input' })`
  border: 1px solid #f0f0f0;
  padding: 10px;
  font-size: 10px;
  border-radius: 3px;
  outline: none;
  width: calc(100% - 20px);
  font-family: 'Roboto', sans-serif;
`;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchBarWrapper>
      <InputWrapper>
        <StyledSearchInput
          value={searchValue}
          placeholder="Search ..."
          onChange={evt => setSearchValue(evt.target.value)}
        />
        <SearchIcon src={searchIcon} alt="searchIcon" />
      </InputWrapper>
      {searchValue.length > 0 && <SearchDropdown />}
    </SearchBarWrapper>
  );
};

export default SearchBar;
