/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchUsersList, setCurrentChat } from 'messages-page/actions/newMessageActions';
import TextInput from 'common/components/text-input/TextInput';
import GenericModal from 'common/components/GenericModal';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import UserSection from 'common/components/layout/navbar/UserSection';

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
  border: 1px solid #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #fafafa;
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

const NewMessageModal = ({
  onClose,
  setCurrentChatFunc,
  onChoice,
  usersData,
  isLoading,
  isError,
  fetchUsersListFunc,
  userId,
}) => {
  const [personText, setPersonText] = useState('');

  const onTextChange = value => {
    setPersonText(value);
    fetchUsersListFunc(value, userId);
  };

  const usernameOnClick = person => {
    setCurrentChatFunc(person);
    onChoice(person);
  };

  const renderListOfPeople = () => (
    <ListOfPeople>
      {usersData.map(person => (
        <ListOfPeopleItem key={person.userId} onClick={() => usernameOnClick(person)}>
          <UserSection
            firstName={person.firstName}
            lastName={person.lastName}
            bottomText="Patient"
            showIcon={false}
            circleSize={30}
            circleFontSize={9}
          />
        </ListOfPeopleItem>
      ))}
    </ListOfPeople>
  );

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
        onChange={evt => onTextChange(evt.target.value)}
        id="person-text"
        type="text"
        label="Person name"
      />
      {usersData.length > 0 && personText.length > 0 ? (
        renderListOfPeople()
      ) : isLoading ? (
        <ProgressIndicatorCircular size={40} />
      ) : null}
    </GenericModal>
  );
};

NewMessageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChoice: PropTypes.func.isRequired,
  setCurrentChatFunc: PropTypes.func.isRequired,
  fetchUsersListFunc: PropTypes.func.isRequired,
  usersData: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.messages.usersList.isLoading,
  isError: state.messages.usersList.isError,
  usersData: state.messages.usersList.usersData,
  userId: state.common.accountData.userData.userId,
});

const mapDispatchToProps = dispatch => ({
  fetchUsersListFunc: (searchQuery, userId) => dispatch(fetchUsersList(searchQuery, userId)),
  setCurrentChatFunc: person => dispatch(setCurrentChat(person)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageModal);
