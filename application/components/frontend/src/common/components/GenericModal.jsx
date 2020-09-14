import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import exitButton from 'images/exit_button.png';

const ModalWrapper = styled.div.attrs({ className: 'modal-wrapper' })`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-transition: 0.5s;
  overflow: auto;
`;

const ModalContent = styled.div.attrs({ className: 'modal-content' })`
  background-color: #fefefe;
  margin: auto;
  padding: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseBadgeButton = styled.img.attrs({
  className: 'close-badge-button',
  alt: 'close-badge-button',
})`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 10px;
  height: 10px;
  cursor: pointer;
  filter: invert(0.9);
`;

const GenericModal = ({ onClose, children, style }) => (
  <ModalWrapper onClick={onClose}>
    <ModalContent style={style} onClick={event => event.stopPropagation()}>
      {children}
      <CloseBadgeButton onClick={onClose} src={exitButton} />
    </ModalContent>
  </ModalWrapper>
);

GenericModal.defaultProps = {
  style: {},
};

GenericModal.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
  style: PropTypes.instanceOf(Object),
};

export default GenericModal;
