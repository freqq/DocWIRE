/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getNewNotificationsCount } from 'common/actions/notificationsActions';
import NotificationsDropdown from 'common/components/layout/navbar/NotificationsDropdown';
import bellIcon from 'images/icons/bell.svg';

const NotificationsBellWrapper = styled.div.attrs({ className: 'notifications-bell-wrapper' })`
  position: relative;
  display: inline-block;
  margin-right: 30px;
  height: 50px;
`;

const BellIconImage = styled.img.attrs({ className: 'bell-icon-image' })`
  height: 20px;
  cursor: pointer;
  vertical-align: middle;
`;

const NotificationCount = styled.div.attrs({ className: 'notifications-count' })`
  position: absolute;
  top: 10px;
  right: -7px;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  text-align: center;
  font-size: 10px;
  line-height: 16px;
  background: #2d4564;
  color: #ffffff;
`;

const NotificationsBell = ({
  getNewNotificationsCountFunc,
  isLoading,
  isError,
  notificationsCount,
}) => {
  useEffect(() => {
    getNewNotificationsCountFunc();
  }, []);

  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  return (
    <NotificationsBellWrapper>
      <BellIconImage
        src={bellIcon}
        alt="bellIcon"
        onClick={() => setShowNotificationsDropdown(true)}
      />
      {!isLoading && notificationsCount !== 0 && (
        <NotificationCount>{notificationsCount}</NotificationCount>
      )}
      {showNotificationsDropdown && (
        <NotificationsDropdown onOutsideClick={() => setShowNotificationsDropdown(false)} />
      )}
    </NotificationsBellWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.common.notifications.isLoading,
  isError: state.common.notifications.isError,
  notificationsCount: state.common.notifications.data,
});

const mapDispatchToProps = dispatch => ({
  getNewNotificationsCountFunc: () => dispatch(getNewNotificationsCount()),
});

NotificationsBell.propTypes = {
  getNewNotificationsCountFunc: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  notificationsCount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);
