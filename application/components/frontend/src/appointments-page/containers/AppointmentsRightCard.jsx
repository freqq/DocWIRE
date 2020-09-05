import React from 'react';
import styled from 'styled-components';

import AppointmentsChart from 'appointments-page/components/AppointmentsChart';
import SmallCalendar from 'appointments-page/components/SmallCalendar';

const AppointmentsRightCardWrapper = styled.div.attrs({
  className: 'appointments-right-card-wrapper',
})`
  height: 78vh;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
`;

const AppointmentsRightCard = () => {
  return (
    <AppointmentsRightCardWrapper>
      <AppointmentsChart />
      <SmallCalendar />
    </AppointmentsRightCardWrapper>
  );
};

export default AppointmentsRightCard;
