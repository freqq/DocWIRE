import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import {
  getCurrentMonthName,
  getCurrentYear,
  getCurrentDayOfMonth,
  daysInCurrentMonth,
} from 'common/utils/date_utils';
import arrowLeft from 'images/icons/left-arrow.svg';
import arrowRight from 'images/icons/right-arrow.svg';

const AppointmentsHeaderWrapper = styled.div.attrs({ className: 'appointments-header-wrapper' })`
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const AppointmentsHeaderDetails = styled.div.attrs({ className: 'appointments-header-details' })`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 13px;
  margin-bottom: 10px;
`;

const AppointmentsMonth = styled.div.attrs({ className: 'appointments-month' })`
  text-align: left;
  font-weight: 400;
`;

const AppointmentsYear = styled.div.attrs({ className: 'appointments-year' })`
  text-align: right;
  font-weight: 100;
`;

const DayChooseWarpper = styled.div.attrs({ className: 'day-choose-wrapper' })`
  width: 65%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5% repeat(7, 1fr) 5%;
  gap: 10px;
  marign-top: 20px;
`;

const DayButton = styled.div.attrs({ className: 'day-button' })`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  text-align: center;
  padding: 12px 0 8px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid #ffffff;
  border-radius: 3px;

  &:hover {
    background: #fafbfd;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
    border: 1px solid #f0f0f0;
    transform: scale(1.07);
  }
`;

const DayName = styled.div.attrs({ className: 'day-name' })`
  font-weight: 100;
  font-size: 11px;
  margin-bottom: 10px;
`;

const DayNumber = styled.div.attrs({ className: 'day-number' })``;

const ArrowButton = styled.div.attrs({ className: 'arrow-button' })``;

const ArrowButtonImage = styled.img.attrs({ className: 'arrow-button-image' })`
  width: 10px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.5;
    transform: scale(1.2) translateY(-50%);
  }
`;

const ACTIVE_DAY_STYLE = {
  background: '#fafbfd',
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.02)',
  border: '1px solid #f0f0f0',
};

const AppointmentsHeader = () => {
  const createWeekNumbersArray = () => {
    const returnArray = [];
    const startOfTheWeek = moment().startOf('isoweek').toDate().getDate();
    const endOfTheWeek = moment().endOf('isoweek').toDate().getDate();

    for (let i = 0; i < 5; i += 1) {
      if (startOfTheWeek + i > daysInCurrentMonth())
        returnArray.push(startOfTheWeek + i - daysInCurrentMonth());
      else returnArray.push(startOfTheWeek + i);
    }

    return [startOfTheWeek, ...returnArray, endOfTheWeek];
  };

  const DAYS_ARRAY = [
    {
      name: 'M',
      number: createWeekNumbersArray()[0],
    },
    {
      name: 'T',
      number: createWeekNumbersArray()[1],
    },
    {
      name: 'W',
      number: createWeekNumbersArray()[2],
    },
    {
      name: 'T',
      number: createWeekNumbersArray()[3],
    },
    {
      name: 'F',
      number: createWeekNumbersArray()[4],
    },
    {
      name: 'S',
      number: createWeekNumbersArray()[5],
    },
    {
      name: 'S',
      number: createWeekNumbersArray()[6],
    },
  ];

  return (
    <AppointmentsHeaderWrapper>
      <AppointmentsHeaderDetails>
        <AppointmentsMonth>{getCurrentMonthName()}</AppointmentsMonth>
        <AppointmentsYear>{getCurrentYear()}</AppointmentsYear>
      </AppointmentsHeaderDetails>
      <DayChooseWarpper>
        <ArrowButton>
          <ArrowButtonImage src={arrowLeft} alt="arrow-rigth" />
        </ArrowButton>
        {DAYS_ARRAY.map(dayData => (
          <DayButton style={dayData.number === getCurrentDayOfMonth() ? ACTIVE_DAY_STYLE : {}}>
            <DayName>{dayData.name}</DayName>
            <DayNumber>{dayData.number}</DayNumber>
          </DayButton>
        ))}
        <ArrowButton>
          <ArrowButtonImage src={arrowRight} alt="arrow-rigth" />
        </ArrowButton>
      </DayChooseWarpper>
    </AppointmentsHeaderWrapper>
  );
};

export default AppointmentsHeader;
