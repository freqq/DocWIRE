import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import AppointmentsHeader from 'appointments-page/components/AppointmentsHeader';
import AppointmentsCurrentDate from 'appointments-page/components/AppointmentsCurrentDate';
import AppointmentsAtHour from 'appointments-page/components/AppointmentsAtHour';

const AppointmentsLeftCardWrapper = styled.div.attrs({
  className: 'appointments-left-card-wrapper',
})`
  height: 78vh;
  overflow: hidden;
  background: #ffffff;
  padding: 25px;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
`;

const AppointmentsListWrapper = styled.div.attrs({
  className: 'appointments-list-wrapper',
})`
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const AppointmentsLeftCard = () => {
  const [chosenDate, setChosenDate] = useState(moment());

  return (
    <AppointmentsLeftCardWrapper>
      <AppointmentsHeader chosenDate={chosenDate} setChosenDate={setChosenDate} />
      <AppointmentsCurrentDate date={chosenDate} />
      <AppointmentsListWrapper>
        <AppointmentsAtHour chosenDate={chosenDate} />
      </AppointmentsListWrapper>
    </AppointmentsLeftCardWrapper>
  );
};

export default AppointmentsLeftCard;
