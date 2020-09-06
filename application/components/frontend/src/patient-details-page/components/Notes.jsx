import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import personIcon from 'images/icons/user.svg';

const NotesWrapper = styled.div.attrs({ className: 'notes-wrapper' })`
  font-weight: 100;
  border-radius: 5px;
  padding: 15px 10px;
  background: #ffffff;
  height: calc(100% - 25px);
  width: calc(100% - 22px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  height: auto;
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  font-weight: 400;
  margin-bottom: 10px;
`;

const NotesList = styled.div.attrs({ className: 'notes-list' })`
  max-height: calc(100% - 144px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NoteShortcut = styled.div.attrs({ className: 'note-shortcut' })`
  font-size: 13px;
  margin-bottom: 5px;
`;
const NoteDetails = styled.div.attrs({ className: 'note-details' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 9px;
`;

const Author = styled.div.attrs({ className: 'author' })`
  text-align: left;
  display: flex;
`;

const AuthorIcon = styled.img.attrs({ className: 'author-icon' })`
  width: 9px;
  margin-right: 5px;
`;

const AuthorName = styled.div.attrs({ className: 'author-name' })``;

const Date = styled.div.attrs({ className: 'date' })`
  text-align: right;
`;

const SavedNote = styled.div.attrs({ className: 'saved-note' })`
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NewNoteWrapper = styled.div.attrs({ className: 'new-note-wrapper' })`
  position: relative;
  margin-bottom: 10px;
`;

const NewNoteInput = styled.textarea.attrs({ className: 'new-note-input' })`
  background: #eff1f7;
  width: calc(100% - 30px);
  height: 70px;
  padding: 15px;
  border-radius: 5px;
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  resize: none;
  border: none;
`;

const NewNoteAddButton = styled.button.attrs({ className: 'new-note-add-buton' })`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: #2d4564;
  border-radius: 5px;
  padding: 8px;
  color: #ffffff;
  font-size: 9px;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`;

const NEW_NOTE_PLACEHOLDER = 'Add some new note...';

const Notes = ({ savedNotes }) => {
  return (
    <NotesWrapper>
      <CardTitle>Notes</CardTitle>
      <NewNoteWrapper>
        <NewNoteInput placeholder={NEW_NOTE_PLACEHOLDER} />
        <NewNoteAddButton>save note</NewNoteAddButton>
      </NewNoteWrapper>
      <NotesList>
        {savedNotes.map(note => (
          <SavedNote key={note.id}>
            <NoteShortcut>{note.shortcut}</NoteShortcut>
            <NoteDetails>
              <Author>
                <AuthorIcon src={personIcon} alt="person-icon" />
                <AuthorName>{note.author}</AuthorName>
              </Author>
              <Date>{note.date}</Date>
            </NoteDetails>
          </SavedNote>
        ))}
      </NotesList>
    </NotesWrapper>
  );
};

Notes.propTypes = {
  savedNotes: PropTypes.instanceOf(Object).isRequired,
};

export default Notes;
