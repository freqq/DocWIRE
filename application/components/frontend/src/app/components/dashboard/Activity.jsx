import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ActivityWrapper = styled.div.attrs({ className: 'activity-wrapper' })`
  display: grid;
  grid-template-columns: 30px 1fr 5fr;
  font-size: 11px;
  gap: 15px;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;

  &:last-child {
    border: none;
  }
`;

const ActivityOwner = styled.div.attrs({ className: 'activity-owner' })`
  line-height: 15px;
`;

const ActivityContent = styled.div.attrs({ className: 'activity-content' })``;

const ActivityText = styled.p.attrs({ className: 'activity-text' })`
  margin: 0;
`;

const ActivityQuote = styled.p.attrs({ className: 'activity-quote' })`
  margin: 15px 0 0 0;
  padding: 15px;
  background: #f6f6f6;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
`;

const ActivityUsername = styled.p.attrs({ className: 'activity-username' })`
  margin: 0;
  font-weight: 400;
`;

const ActivityDate = styled.p.attrs({ className: 'activity-date' })`
  margin: 0;
  font-weight: 100;
`;

const ActivityImage = styled.img.attrs({ className: 'activity-image' })`
  display: inline-block;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid #f0f0f0;
`;

const Activity = ({ activityImage, userName, activityDate, activityContent, quote }) => (
  <ActivityWrapper>
    <ActivityImage src={activityImage} alt="activityImage" />
    <ActivityOwner>
      <ActivityUsername>{userName}</ActivityUsername>
      <ActivityDate>{activityDate}</ActivityDate>
    </ActivityOwner>
    <ActivityContent>
      <ActivityText>{activityContent}</ActivityText>
      {quote && <ActivityQuote>{quote}</ActivityQuote>}
    </ActivityContent>
  </ActivityWrapper>
);

Activity.propTypes = {
  activityImage: PropTypes.instanceOf(Object).isRequired,
  userName: PropTypes.string.isRequired,
  activityDate: PropTypes.string.isRequired,
  activityContent: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

export default Activity;
