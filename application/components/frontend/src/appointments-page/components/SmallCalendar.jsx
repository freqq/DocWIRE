/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import shortid from 'shortid';

const Frame = styled.div`
  font-size: 11px;
  padding: 20px 20px 0 20px;
  background: #ffffff;
  height: calc(100% - 20px);
  width: calc(100% - 40px);
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
`;

const Header = styled.div`
  font-family: 'Roboto-Medium', sans-serif;
  font-size: 14px;
  font-weight: 100;
  text-align: right;
  margin-bottom: 10px;
  font-family: 'Heebo', sans-serif;
  padding-right: 30px;
  margin-bottom: 10px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const DayHeader = styled.span`
  font-weight: 400;
`;

const Day = styled.div`
  width: 14%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 100;

  &:hover {
    background-color: #2e4663;
    border-radius: 4px;
    color: #fff;
  }

  ${props =>
    props.isToday &&
    css`
      border: 1px solid #2e4663;
      border-radius: 4px;
    `}

  ${props =>
    props.isSelected &&
    css`
      color: #ffffff;
      border-radius: 4px;
      background-color: #2e4663;
    `}
`;

function SmallCalendar() {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const MONTHS = [
    'Januray',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function getStartDayOfMonth(dateObj) {
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
  }

  function isLeapYear(yearObj) {
    return (yearObj % 4 === 0 && yearObj % 100 !== 0) || yearObj % 400 === 0;
  }

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  const days = isLeapYear ? DAYS_LEAP : DAYS;

  return (
    <Frame>
      <Header>
        {MONTHS[month]} {year}
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map(d => (
          <Day key={d}>
            <DayHeader>{d}</DayHeader>
          </Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={shortid.generate()}
                isToday={d === today.getDate()}
                isSelected={d === day}
                onClick={() => setDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ''}
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
}

export default SmallCalendar;
