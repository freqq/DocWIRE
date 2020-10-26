import React, { useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import { getNotificationsList } from 'common/actions/notificationsActions';
import triangleImg from 'images/triangle-img.png';
import eventDateIcon from 'images/icons/event_date_icon.svg';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Link } from 'react-router-dom';

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo('en-US');

const NotificationsMenu = styled.div.attrs({ className: 'notifications-menu' })`
  border: 1px solid rgba(100, 100, 100, 0.4);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  background: #ffffff;
  line-height: 15px;
  font-size: 11px;
  position: absolute;
  top: 55px;
  left: -341px;
  z-index: 9999;
  font-family: 'Roboto', sans-serif !important;
  cursor: auto;
`;

const NotificationsList = styled.ul.attrs({ className: 'notifications-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: calc(100% - 70px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const RelativeBox = styled.div.attrs({ className: 'relative-box' })`
  position: relative;
  height: 400px;
  width: 370px;
`;

const TopTriangle = styled.div.attrs({ className: 'top-triangle' })`
  background-image: url(${triangleImg});
  background-repeat: no-repeat;
  background-size: 33px 521px;
  background-position: 0 -305px;
  height: 11px;
  position: absolute;
  top: -11px;
  right: 10px;
  width: 20px;
`;

const NotificationListItem = styled.li.attrs({ className: 'notification-list-item' })`
  background: ${props => props.inputColor || '#fff'};
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
  padding: 5px;
  cursor: pointer;
  min-width: 360px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr;
  grid-template-areas: 'notification-item-img notification-item-text';

  &:hover {
    background: #f4f4f4;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationItemBox = styled.div.attrs({
  className: 'notification-item-box',
})`
  grid: notification-item-img;
  position: relative;
`;

const StyledLink = styled(Link).attrs({
  className: 'styled-notifications-list',
})`
  text-decoration: none;
  color: #000;
  display: inline-block;
  border-bottom: 1px solid #d0d0d0;
`;

const NewNotificationDot = styled.div.attrs({
  className: 'new-notification-dot',
})`
  border-radius: 50%;
  position: absolute;
  top: 14px;
  left: -3px;
  width: 10px;
  height: 10px;
  background: #2d4564;
  border: 2px solid #f0f0f0;
`;

const NotificationItemImg = styled.div.attrs({
  className: 'notification-item-img',
})`
  align: left;
  color: #fff;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  margin: 3px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  background: #2d4564;
  letter-spacing: -2px;
`;

const NotificationTextName = styled.div.attrs({ className: 'notification-text-name' })`
  grid: notification-text-name;
  font-weight: 100;
  text-align: left;
  padding-top: 7px;
`;

const BoldText = styled.span.attrs({ className: 'bold-top' })`
  font-family: 'Roboto-Medium', sans-serif;
  margin-right: 4px;
`;

const NotificationsHeader = styled.p.attrs({ className: 'notifications-header' })`
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
  padding: 10px;
  font-family: 'Roboto-Medium', sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const NotificationsHeaderTitle = styled.p.attrs({ className: 'notifications-header-title' })`
  text-align: left;
  margin: 0;
`;

const NotificationsHeaderMarkAsRead = styled.p.attrs({
  className: 'notifications-header-mark-as-read',
})`
  text-align: right;
  color: #2d4564;
  margin: 0;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NotificationsFooter = styled.p.attrs({ className: 'notifications-footer' })`
  border-top: 1px solid #f0f0f0;
  margin: 0;
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: calc(100% - 20px);
  font-family: 'Roboto-Medium', sans-serif;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #f4f4f4;
    text-decoration: underline;
  }
`;

const NotificationDate = styled.p.attrs({ className: 'notification-date' })`
  margin: 0;
  padding: 0;
`;

const NoNotificationsBox = styled.div.attrs({ className: 'no-notifications-box' })`
  text-align: center;
  font-size: 11px;
  border: 1px solid #f0f0f0;
  width: 90%;
  margin: 20px auto;
  padding: 20px 0;
`;

const NotificationDateIcon = styled.img.attrs({
  className: 'notification-date-icon',
  alt: 'notification-date-icon',
})`
  width: 10px;
  display: inline-block;
  margin: 3px 3px 0 0;
  float: left;
`;

const NotificationDropdown = ({
  onOutsideClick,
  notificationsList,
  isLoading,
  getNotificationsListFunc,
}) => {
  NotificationDropdown.handleClickOutside = () => onOutsideClick();

  useEffect(() => {
    getNotificationsListFunc();
  }, []);

  const convertUTCDateToLocalDate = date => {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  };

  const checkIfAnyUnreadNotifications = () =>
    notificationsList.some(notification => !notification.read);

  const getFullName = user => `${user.firstName} ${user.lastName}`;

  const getCirlceData = user =>
    `${user.firstName.charAt(0).toUpperCase()} ${user.lastName.charAt(0).toUpperCase()}`;

  const renderList = () => (
    <NotificationsList>
      {notificationsList.map(notification => (
        <StyledLink
          to={`'/appointments/${notification.appointmentId}`}
          key={notification.appointmentId}
        >
          <NotificationListItem style={notification.read ? {} : { background: '#f4f4f4' }}>
            <NotificationItemBox>
              <NotificationItemImg>{getCirlceData(notification.author)}</NotificationItemImg>
              {!notification.read && <NewNotificationDot />}
            </NotificationItemBox>
            <NotificationTextName>
              <BoldText>{getFullName(notification.author)}</BoldText>
              {notification.content}
              <NotificationDate>
                <NotificationDateIcon src={eventDateIcon} />
                {timeAgo.format(convertUTCDateToLocalDate(new Date(notification.notificationDate)))}
              </NotificationDate>
            </NotificationTextName>
          </NotificationListItem>
        </StyledLink>
      ))}
    </NotificationsList>
  );

  return (
    <NotificationsMenu>
      <RelativeBox>
        {isLoading ? (
          <ProgressIndicatorCircular />
        ) : (
          <>
            <NotificationsHeader>
              <NotificationsHeaderTitle>Notifications</NotificationsHeaderTitle>
              {checkIfAnyUnreadNotifications() && (
                <NotificationsHeaderMarkAsRead>Mark all as read</NotificationsHeaderMarkAsRead>
              )}
            </NotificationsHeader>
            {notificationsList.length === 0 ? (
              <NoNotificationsBox>No avialable notifictations.</NoNotificationsBox>
            ) : (
              renderList()
            )}
            <NotificationsFooter>Show all</NotificationsFooter>
            <TopTriangle />
          </>
        )}
      </RelativeBox>
    </NotificationsMenu>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => NotificationDropdown.handleClickOutside,
};

const mapStateToProps = state => ({
  isLoading: state.common.notifications.isListLoading,
  notificationsList: state.common.notifications.notificationsData,
});

const mapDispatchToProps = dispatch => ({
  getNotificationsListFunc: () => dispatch(getNotificationsList()),
});

NotificationDropdown.propTypes = {
  getNotificationsListFunc: PropTypes.func.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  notificationsList: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(onClickOutside(NotificationDropdown, clickOutsideConfig));
