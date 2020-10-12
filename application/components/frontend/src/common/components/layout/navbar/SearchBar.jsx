import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSearch } from 'common/actions/searchActions';
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

const SearchBar = ({ isLoading, isError, searchData, getSearchFunc }) => {
  const [searchValue, setSearchValue] = useState('');

  const searchOnChange = search => {
    setSearchValue(search);
    getSearchFunc(search);
  };

  return (
    <SearchBarWrapper>
      <InputWrapper>
        <StyledSearchInput
          value={searchValue}
          placeholder="Search ..."
          onChange={evt => searchOnChange(evt.target.value)}
        />
        <SearchIcon src={searchIcon} alt="searchIcon" />
      </InputWrapper>
      {searchValue.length > 0 && (
        <SearchDropdown isLoading={isLoading} isError={isError} searchData={searchData} />
      )}
    </SearchBarWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.common.search.isLoading,
  isError: state.common.search.isError,
  searchData: state.common.search.data,
});

const mapDispatchToProps = dispatch => ({
  getSearchFunc: query => dispatch(getSearch(query)),
});

SearchBar.propTypes = {
  getSearchFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  searchData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
