/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from 'common/components/text-input/TextInput';
import GenericModal from 'common/components/GenericModal';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const NewMessageErrorBlock = styled.div.attrs({ className: 'new-message-error-block' })`
  padding: 10px;
  margin: 5px 0;
  text-align: center;
  background: #fce7e6;
  font-size: 12px;
  color: #552526;
`;

const ListOfPeople = styled.ul.attrs({ className: 'list-of-people' })`
  margin: 0;
  list-style-type: none;
  padding: 0;
`;

const ListOfPeopleItem = styled.li.attrs({ className: 'list-of-people-item' })`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-gap: 10px;
  grid-template-areas: 'person-avatar person-username';
  border: 1px solid #f0f0f0;
  padding: 10px;
  line-height: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const PersonAvatar = styled.div.attrs({ className: 'person-avatar' })`
  grid: person-avatar;
  display: inline-block;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: #fff;
  background: #2d4564;
  text-align: center;
  font-size: 12px;
`;

const PersonUsername = styled.div.attrs({ className: 'person-username' })`
  grid: person-username;
  font-size: 12px;
`;

const NewMessageModal = ({ onClose }) => {
  const [personText, setPersonText] = useState('');
  const [filteredListOfPeople, setFilteredListOfPeople] = useState([]);
  const isLoading = false;
  const isError = false;

  const renderListOfPeople = () => (
    <ListOfPeople>
      {filteredListOfPeople.map(person => (
        <ListOfPeopleItem key={person.id}>
          <PersonAvatar>{person.username.charAt(0).toUpperCase()}</PersonAvatar>
          <PersonUsername>{person.username}</PersonUsername>
        </ListOfPeopleItem>
      ))}
    </ListOfPeople>
  );

  if (isLoading) return <ProgressIndicatorCircular size={40} />;

  if (isError) {
    return (
      <GenericModal onClose={onClose}>
        <NewMessageErrorBlock>An error occurred while fetching users list.</NewMessageErrorBlock>
      </GenericModal>
    );
  }

  return (
    <GenericModal onClose={onClose}>
      <TextInput
        value={personText}
        onChange={evt => setPersonText(evt.target.value)}
        id="person-text"
        type="text"
        label="Person name"
      />
      {filteredListOfPeople.length > 0 && personText.length > 0 && renderListOfPeople()}
    </GenericModal>
  );
};

NewMessageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewMessageModal;
