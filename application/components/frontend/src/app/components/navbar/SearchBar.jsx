import React from 'react';
import styled from 'styled-components';

const SearchBarWrapper = styled.div.attrs({ className: 'search-bar-wrapper' })`
  display: inline-block;
`;

const StyledSearchInput = styled.input.attrs({ className: 'styled-search-input' })`
  border: 1px solid #f0f0f0;
  padding: 10px;
  font-size: 10px;
  border-radius: 5px;
  outline: none;
  width: 400px;
  font-family: 'Roboto', sans-serif;
`;

const SearchBar = () => (
  <SearchBarWrapper>
    <StyledSearchInput placeholder="Search ..." />
  </SearchBarWrapper>
);

export default SearchBar;
