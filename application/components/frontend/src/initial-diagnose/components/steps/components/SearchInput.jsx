import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  padding: 15px 25px;
  font-size: 11px;
  width: calc(100% - 50px);
`;

const SearchIcon = styled.img.attrs({ className: 'search-icon' })`
  position: absolute;
  top: 16px;
  right: 15px;
  height: 12px;
  cursor: pointer;
`;

const SearchInput = ({ id, onKeyDown, placeholder }) => (
  <SearchInputWrapper>
    <InputWrapper>
      <InputComponent placeholder={placeholder} onKeyDown={onKeyDown} id={id} />
      <SearchIcon src={searchIcon} alt="searchIcon" />
    </InputWrapper>
  </SearchInputWrapper>
);

SearchInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onKeyDown: PropTypes.string.isRequired,
};

export default SearchInput;
