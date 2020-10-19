import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getCurrentMonthName, getCurrentYear, daysInCurrentMonth } from 'common/utils/date_utils';
import arrowLeft from 'images/icons/left-arrow.svg';
import arrowRight from 'images/icons/right-arrow.svg';

const AppointmentsHeaderWrapper = styled.div.attrs({ className: 'appointments-header-wrapper' })`
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
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
  width: 90%;
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
  font-size: 8px;
  margin-bottom: 10px;
`;

const DayNumber = styled.div.attrs({ className: 'day-number' })`
  font-size: 12px;
`;

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

const AppointmentsHeader = ({ chosenDate, setChosenDate }) => {
  const createWeekNumbersArray = () => {
    const returnArray = [];
    const startOfTheWeek = moment().startOf('isoweek');
    const endOfTheWeek = moment().endOf('isoweek');

    for (let i = 1; i < 6; i += 1) {
      if (startOfTheWeek.toDate().getDate() + i >= daysInCurrentMonth())
        returnArray.push(startOfTheWeek.subtract(i - daysInCurrentMonth(), 'd'));
      else returnArray.push(startOfTheWeek.add(i, 'd'));
    }

    return [startOfTheWeek, ...returnArray, endOfTheWeek];
  };

  const DAYS_ARRAY = [
    {
      name: 'M',
      number: createWeekNumbersArray()[0].toDate().getDate(),
      date: createWeekNumbersArray()[0],
    },
    {
      name: 'T',
      number: createWeekNumbersArray()[1].toDate().getDate(),
      date: createWeekNumbersArray()[1],
    },
    {
      name: 'W',
      number: createWeekNumbersArray()[2].toDate().getDate(),
      date: createWeekNumbersArray()[2],
    },
    {
      name: 'T',
      number: createWeekNumbersArray()[3].toDate().getDate(),
      date: createWeekNumbersArray()[3],
    },
    {
      name: 'F',
      number: createWeekNumbersArray()[4].toDate().getDate(),
      date: createWeekNumbersArray()[4],
    },
    {
      name: 'S',
      number: createWeekNumbersArray()[5].toDate().getDate(),
      date: createWeekNumbersArray()[5],
    },
    {
      name: 'S',
      number: createWeekNumbersArray()[6].toDate().getDate(),
      date: createWeekNumbersArray()[6],
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
          <DayButton
            onClick={() => setChosenDate()}
            style={dayData.date === chosenDate ? ACTIVE_DAY_STYLE : {}}
          >
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

AppointmentsHeader.propTypes = {
  chosenDate: PropTypes.instanceOf(Date).isRequired,
  setChosenDate: PropTypes.func.isRequired,
};

export default AppointmentsHeader;
