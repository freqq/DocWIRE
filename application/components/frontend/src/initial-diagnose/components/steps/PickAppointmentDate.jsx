/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import shortid from 'shortid';

import GenericStep from 'initial-diagnose/components/GenericStep';
import { SHORT_WEEK_DAYS_NAMES } from 'common/utils/date_constants';

import morningIcon from 'images/icons/morning.svg';
import afternoonIcon from 'images/icons/afternoon.svg';

const TIME_ARRAY = [
  {
    id: 1,
    name: 'Morning',
    icon: morningIcon,
    slots: 4,
    array: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  },
  {
    id: 2,
    name: 'Afternoon',
    icon: afternoonIcon,
    slots: 3,
    array: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
  },
];

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: bold;
  font-size: 15px;
  margin: 15px 0;
`;

const DateWrapper = styled.div.attrs({ className: 'date-wrapper' })``;

const TimeWrapper = styled.div.attrs({ className: 'time-wrapper' })`
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 15px;
`;

const PickerWrapper = styled.div.attrs({ className: 'picker-wrapper' })`
  width: 80%;
  margin: 0 auto;
  max-height: 42vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const TimeList = styled.ul.attrs({ className: 'time-list' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TimeButtonsWrapper = styled.ul.attrs({ className: 'time-buttons-wrapper' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TimeItem = styled.li.attrs({ className: 'time-item' })`
  margin: 0 0 15px 0;
  padding: 0;
`;

const TimeButton = styled.li.attrs({ className: 'time-button' })`
  margin: 0 10px 0 0;
  padding: 10px;
  border: 1px solid #f0f0f0;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const TimeDetails = styled.div.attrs({ className: 'time-details' })`
  display: flex;
  margin-bottom: 10px;
`;

const TimeIcon = styled.img.attrs({ className: 'time-icon' })`
  width: 25px;
  margin-right: 10px;
`;

const TimeTop = styled.div.attrs({ className: 'time-top' })`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
`;

const TimeBottom = styled.div.attrs({ className: 'time-bottom' })`
  font-size: 10px;
  font-weight: 100;
`;

const DateList = styled.div.attrs({ className: 'date-list' })`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 0 auto;
  width: 70%;
`;

const Week = styled.ul.attrs({ className: 'week' })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

const Day = styled.li.attrs({ className: 'day' })`
  margin: 0 10px 0 0;
  padding: 10px;
  border: 1px solid #f0f0f0;
  text-align: center;
  border-radius: 4px;
  display: inline-block;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const TimeName = styled.div.attrs({ className: 'time-name' })`
  font-size: 12px;
  line-height: 25px;
  margin-right: 10px;
`;

const TimeSlots = styled.div.attrs({ className: 'time-slots' })`
  padding: 3px 6px;
  color: #fff;
  font-size: 11px;
  line-height: 19px;
  font-weight: 100;
  border-radius: 6px;
  background: #2d4564;
`;

const getNextWeekDays = isFollowingDayNextWeek => {
  const weeksToAdd = isFollowingDayNextWeek ? 2 : 1;
  const startOfTheWeek = moment().add(weeksToAdd, 'w').startOf('week').isoWeekday(1);
  const endOfTheWeek = moment().add(weeksToAdd, 'w').endOf('week').isoWeekday(1).subtract(1, 'd');

  const middleWeekDays = [];

  const startOfWeekForLoop = moment().add(weeksToAdd, 'w').startOf('week').isoWeekday(1);
  for (let i = 1; i < 6; i += 1) {
    const dateToAdd = moment(startOfWeekForLoop.add(1, 'd'));
    middleWeekDays.push(dateToAdd);
  }

  const finalArray = [startOfTheWeek, ...middleWeekDays, endOfTheWeek];

  const returnArray = [];
  for (let item = 0; item < finalArray.length; item += 1) {
    const dayItem = {
      name:
        SHORT_WEEK_DAYS_NAMES[finalArray[item].day() - 1 === -1 ? 6 : finalArray[item].day() - 1],
      number: finalArray[item].date(),
    };
    returnArray.push(dayItem);
  }

  return returnArray;
};

const getCurrentWeekDays = () => {
  const currentDayPlusOne = moment().add(1, 'd');
  const lastDayOfWeek = moment().endOf('week').isoWeekday(1);

  if (currentDayPlusOne.day() === 1) return getNextWeekDays();

  if (currentDayPlusOne.day() === lastDayOfWeek.day())
    return {
      name: SHORT_WEEK_DAYS_NAMES[currentDayPlusOne.day() - 1],
      number: currentDayPlusOne.day(),
    };

  const daysDiff = currentDayPlusOne.diff(lastDayOfWeek, 'd');
  const restDaysArray = [];

  const currentDayPlusOneForLoop = moment().add(1, 'd');
  for (let i = 1; i < -daysDiff; i += 1) {
    const dateToAdd = moment(currentDayPlusOneForLoop.add(1, 'd'));
    restDaysArray.push(dateToAdd);
  }

  const finalArray = [currentDayPlusOne, ...restDaysArray, lastDayOfWeek];

  const returnArray = [];
  for (let item = 0; item < finalArray.length; item += 1) {
    const dayItem = {
      name:
        SHORT_WEEK_DAYS_NAMES[finalArray[item].day() - 1 === -1 ? 6 : finalArray[item].day() - 1],
      number: finalArray[item].date(),
    };
    returnArray.push(dayItem);
  }

  return returnArray;
};

const PICKED_BUTTON_STYLE = {
  background: '#f0f0f0',
};

const PickAppointmentDate = ({
  currentStep,
  totalSteps,
  pickedDate,
  setPickedDate,
  pickedTime,
  setPickedTime,
}) => {
  useEffect(() => {
    getNextWeekDays();

    console.log('DUPA');
    console.log(moment().add(1, 'd').day());
  }, []);

  const isFollowingDayNextWeek = moment().add(1, 'd').day() === 0;

  return (
    <GenericStep
      stepName="Pick an appointment date"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <PickerWrapper>
        <Title>Choose a date</Title>
        <DateWrapper>
          <DateList>
            <Week>
              {getCurrentWeekDays().map(day => (
                <Day
                  onClick={() => setPickedDate(day)}
                  style={
                    pickedDate && day.number === pickedDate.number ? PICKED_BUTTON_STYLE : null
                  }
                >
                  <TimeBottom>{day.name}</TimeBottom>
                  <TimeTop>{day.number}</TimeTop>
                </Day>
              ))}
            </Week>
            <Week>
              {getNextWeekDays(isFollowingDayNextWeek).map(day => (
                <Day
                  onClick={() => setPickedDate(day)}
                  style={
                    pickedDate && day.number === pickedDate.number ? PICKED_BUTTON_STYLE : null
                  }
                >
                  <TimeBottom>{day.name}</TimeBottom>
                  <TimeTop>{day.number}</TimeTop>
                </Day>
              ))}
            </Week>
          </DateList>
        </DateWrapper>
        <Title>Choose a suitable time</Title>
        <TimeWrapper>
          <TimeList>
            {TIME_ARRAY.map(time => (
              <TimeItem key={time.id}>
                <TimeDetails>
                  <TimeIcon src={time.icon} alt="time-icon" />
                  <TimeName>{time.name}</TimeName>
                  <TimeSlots>{`${time.slots} slots`}</TimeSlots>
                </TimeDetails>
                <TimeButtonsWrapper>
                  {time.array.map(button => (
                    <TimeButton
                      onClick={() => setPickedTime(button)}
                      style={button === pickedTime ? PICKED_BUTTON_STYLE : null}
                    >
                      <TimeTop>{button}</TimeTop>
                      <TimeBottom>AM</TimeBottom>
                    </TimeButton>
                  ))}
                </TimeButtonsWrapper>
              </TimeItem>
            ))}
          </TimeList>
        </TimeWrapper>
      </PickerWrapper>
    </GenericStep>
  );
};

PickAppointmentDate.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

PickAppointmentDate.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  pickedDate: PropTypes.instanceOf(Object).isRequired,
  setPickedDate: PropTypes.func.isRequired,
  pickedTime: PropTypes.instanceOf(Object).isRequired,
  setPickedTime: PropTypes.func.isRequired,
};

export default PickAppointmentDate;
