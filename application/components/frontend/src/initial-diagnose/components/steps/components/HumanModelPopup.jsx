import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

const HumanModelPopupWrapper = styled.div.attrs({ className: 'human-model-wrapper' })`
  position: absolute;
  top: 10%;
  right: 80%;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  width: 20vw;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.07);
`;

const RelativeWrapper = styled.div.attrs({ className: 'relative-wrapper' })`
  position: relative;
  height: 100%;
  width: 100%;
`;

const PopupHeader = styled.div.attrs({ className: 'human-model-wrapper' })`
  position: relative;
  font-weight: 400;
  background: #f9fafb;
  padding: 10px;
`;

const PopupList = styled.ul.attrs({ className: 'popup-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 25vh;
  overflow-y: scroll;
`;

const PopupListItem = styled.li.attrs({ className: 'popup-list' })`
  margin: 0;
  padding: 10px;
  transition: 0.2s;
  cursor: pointer;
  font-weight: 100;

  &:hover {
    background: #f3f5f7;
  }
`;

const CloseIcon = styled.span.attrs({ className: 'close-icon' })`
  float: right;
  display: inline-block;
  cursor: pointer;
  color: #c0c0c0;

  &:hover {
    color: #000000;
  }
`;

const BODY_PARTS = [
  {
    id: 1,
    content: '123',
  },
  {
    id: 2,
    content: '456',
  },
  {
    id: 3,
    content: '789',
  },
];

const HumanModelPopup = ({ bodyPart, onClose, onAdd }) => {
  HumanModelPopup.handleClickOutside = () => onClose();

  const addChip = part => {
    onAdd(part);
    onClose();
  };

  return (
    <HumanModelPopupWrapper>
      <RelativeWrapper>
        <PopupHeader>
          {bodyPart}
          <CloseIcon onClick={onClose}>X</CloseIcon>
        </PopupHeader>
        <PopupList>
          {BODY_PARTS.map(part => (
            <PopupListItem onClick={() => addChip(part)} key={part.id}>
              {part.content}
            </PopupListItem>
          ))}
        </PopupList>
      </RelativeWrapper>
    </HumanModelPopupWrapper>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => HumanModelPopup.handleClickOutside,
};

HumanModelPopup.propTypes = {
  bodyPart: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default onClickOutside(HumanModelPopup, clickOutsideConfig);
