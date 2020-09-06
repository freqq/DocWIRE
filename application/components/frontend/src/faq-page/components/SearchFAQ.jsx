import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import searchIcon from 'images/icons/search.svg';

const SearchFAQWrapper = styled.div.attrs({ className: 'search-faq-wrapper' })`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 60%;
`;

const InputWrapper = styled.div.attrs({ className: 'input-wrapper' })`
  position: relative;
`;

const SearchIcon = styled.img.attrs({ className: 'search-icon' })`
  position: absolute;
  top: 20px;
  right: 5px;
  height: 12px;
  cursor: pointer;
`;

const StyledSearchInput = styled.input.attrs({ className: 'styled-search-input' })`
  border: 1px solid #f0f0f0;
  padding: 20px;
  font-size: 10px;
  border-radius: 3px;
  outline: none;
  width: calc(100% - 20px);
  font-family: 'Roboto', sans-serif;
`;

const SearchFAQ = ({ searchValue, setSearchValue }) => (
  <SearchFAQWrapper>
    <InputWrapper>
      <StyledSearchInput
        value={searchValue}
        placeholder="Ask a question ..."
        onChange={evt => setSearchValue(evt.target.value)}
      />
      <SearchIcon src={searchIcon} alt="searchIcon" />
    </InputWrapper>
  </SearchFAQWrapper>
);

SearchFAQ.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default SearchFAQ;
