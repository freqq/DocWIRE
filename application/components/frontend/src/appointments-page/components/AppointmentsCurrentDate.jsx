import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { MONTH_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';

const AppointmentsCurrentDateWrapper = styled.div.attrs({
  className: 'appointments-current-date-wrapper',
})`
  width: 100%;
  margin: 10px 0 20px 0;
  font-size: 12px;
`;

const DateBold = styled.span.attrs({ className: 'date-bold' })`
  font-weight: 400;
`;

const DateWeekDayName = styled.span.attrs({ className: 'date-week-day-name' })`
  font-weight: 100;
  text-transform: uppercase;
`;

const AppointmentsCurrentDate = ({ date }) => {
  const getMonthAndDayOfMohth = () => {
    const monthName = MONTH_NAMES[date.toDate().getMonth()];

    return `${monthName} ${date.toDate().getDate()}, `;
  };

  const getNameOfTheDay = () => WEEK_DAYS_NAMES[date.toDate().getDay() - 1];

  return (
    <AppointmentsCurrentDateWrapper>
      <DateBold>{getMonthAndDayOfMohth()}</DateBold>
      <DateWeekDayName>{getNameOfTheDay()}</DateWeekDayName>
    </AppointmentsCurrentDateWrapper>
  );
};

AppointmentsCurrentDate.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export default AppointmentsCurrentDate;
