import React from 'react';
import styled from 'styled-components';

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

const SearchResult = styled.div.attrs({ className: 'search-result' })`
  display: flex;
  transition: 0.2s;
  padding: 8px 12px;
  cursor: pointer;

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

const SERACH_CATEGORIES = [
  {
    id: 1,
    name: 'Patients',
  },
  {
    id: 2,
    name: 'Doctors',
  },
];

const PEOPLE_LIST = [
  {
    id: 1,
    firstName: 'Adam',
    lastName: 'Sandler',
  },
  {
    id: 2,
    firstName: 'Cobbie',
    lastName: 'Smudlers',
  },
  {
    id: 3,
    firstName: 'Paul',
    lastName: 'Walker',
  },
];

const SearchDropdown = () => {
  const getCircleData = (firstName, lastName) => firstName.charAt(0) + lastName.charAt(0);

  return (
    <SearchDropdownWrapper>
      <SearchCategoriesList>
        {SERACH_CATEGORIES.map(searchCategory => (
          <SearchCategoriesListItem key={searchCategory.id}>
            <SearchCategoryName>{searchCategory.name}</SearchCategoryName>
            <PeopleWrapper>
              {PEOPLE_LIST.map(person => (
                <SearchResult>
                  <UserCircle>{getCircleData(person.firstName, person.lastName)}</UserCircle>
                  <SearchContent>{`${person.firstName} ${person.lastName}`}</SearchContent>
                </SearchResult>
              ))}
            </PeopleWrapper>
          </SearchCategoriesListItem>
        ))}
      </SearchCategoriesList>
    </SearchDropdownWrapper>
  );
};

export default SearchDropdown;
