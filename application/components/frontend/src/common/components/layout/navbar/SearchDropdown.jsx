/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const SearchDropdownWrapper = styled.div.attrs({ className: 'search-dropdown-wrapper' })`
  background: #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.07);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  position: absolute;
  padding: 5px 20px;
  width: 360px;
  top: 105%;
  left: 0;
  z-index: 1;
  min-height: 200px;
`;

const SearchCategoriesList = styled.ul.attrs({ className: 'search-categories-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const SearchCategoriesListItem = styled.li.attrs({ className: 'search-categories-list-item' })`
  margin: 0;
`;

const PeopleWrapper = styled.div.attrs({ className: 'people-wrapper' })``;

const SearchContent = styled.div.attrs({ className: 'search-content' })`
  font-weight: 100;
  line-height: 25px;
  font-size: 10px;
`;

const SearchResult = styled(Link).attrs({ className: 'search-result' })`
  display: flex;
  transition: 0.2s;
  padding: 8px 12px;
  cursor: pointer;
  color: #000;
  text-decoration: none;

  &:hover {
    background: #f0f0f0;
  }
`;

const SearchCategoryName = styled.div.attrs({ className: 'search-category-name' })`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 100;
  line-height: 20px;
  margin: 5px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const UserCircle = styled.div.attrs({ className: 'user-circle' })`
  display: block;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  line-height: 25px;
  margin-right: 10px;
  color: #ffffff;
  background: #2d4564;
  text-align: center;
  font-size: 9px;
  font-weight: 100;
`;

const ErrorBlock = styled.div.attrs({ className: 'error-block' })`
  padding: 20px 10px;
  margin: 5px 0;
  text-align: center;
  background: #fce7e6;
  font-size: 12px;
  color: #552526;
  width: 80%;
  margin: 20px auto;
`;

const NotFound = styled.div.attrs({ className: 'error-block' })`
  margin: 5px 0;
  text-align: center;
  font-size: 11px;
  font-weight: 100;
  width: 80%;
  margin: 20px auto;
`;

const SearchDropdown = ({ isLoading, isError, searchData }) => {
  const getCircleData = (firstName, lastName) => firstName.charAt(0) + lastName.charAt(0);

  if (isError)
    return (
      <SearchDropdownWrapper>
        <SearchCategoriesList>
          <ErrorBlock>There was an error while searching</ErrorBlock>
        </SearchCategoriesList>
      </SearchDropdownWrapper>
    );

  return (
    <SearchDropdownWrapper>
      <SearchCategoriesList>
        {isLoading ? (
          <ProgressIndicatorCircular />
        ) : (
          <>
            <SearchCategoriesListItem>
              <SearchCategoryName>Patients</SearchCategoryName>
              {searchData.patients.length === 0 ? (
                <NotFound>No patients found.</NotFound>
              ) : (
                <PeopleWrapper>
                  {searchData.patients.map(person => (
                    <SearchResult to={`/patient/${person.userId}`}>
                      <UserCircle>{getCircleData(person.firstName, person.lastName)}</UserCircle>
                      <SearchContent>{`${person.firstName} ${person.lastName}`}</SearchContent>
                    </SearchResult>
                  ))}
                </PeopleWrapper>
              )}
            </SearchCategoriesListItem>
            <SearchCategoriesListItem>
              <SearchCategoryName>Doctors</SearchCategoryName>
              {searchData.doctors.length === 0 ? (
                <NotFound>No doctors found.</NotFound>
              ) : (
                <PeopleWrapper>
                  {searchData.doctors.map(person => (
                    <SearchResult to={`/doctor/${person.userId}`}>
                      <UserCircle>{getCircleData(person.firstName, person.lastName)}</UserCircle>
                      <SearchContent>{`${person.firstName} ${person.lastName}`}</SearchContent>
                    </SearchResult>
                  ))}
                </PeopleWrapper>
              )}
            </SearchCategoriesListItem>
          </>
        )}
      </SearchCategoriesList>
    </SearchDropdownWrapper>
  );
};

SearchDropdown.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  searchData: PropTypes.instanceOf(Object).isRequired,
};

export default SearchDropdown;
