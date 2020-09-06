/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AppointmentCard from 'patient-details-page/components/AppointmentCard';

const PatientHistoryWrapper = styled.div.attrs({
  className: 'patient-history-wrapper',
})`
  border-radius: 5px;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  font-size: 10px;
  width: calc(100% - 32px);
  height: calc(100% - 66px);
  overflow: hidden;
`;

const PatientHistoryTabs = styled.ul.attrs({ className: 'patient-history-tabs' })`
  list-style-type: none;
  margin: 0;
  padding: 10px 15px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #fafbfd;
  border: 1px solid #f0f0f0;
`;

const PatientHistoryTabItem = styled.li.attrs({ className: 'patient-history-tab-item' })`
  display: inline-block;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 0 5px;
  transition: 0.2s;
  cursor: pointer;
  font-weight: 100;
  border: 1px solid #f0f0f0;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background: #607086;
    color: #ffffff;
  }
`;

const PatientHistoryList = styled.div.attrs({ className: 'patient-history-list' })`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: #eff1f7;
  border: 1px solid #f0f0f0;
  border-top: none;
  max-height: calc(100% - 55px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const TreatmentName = styled.div.attrs({ className: 'treatment-name' })`
  padding: 15px;
  border-bottom: 1px solid #aaa;
  border-top: 1px solid #aaa;
`;

const AppointmentsGrid = styled.div.attrs({ className: 'appointments-grid' })`
  display: grid;
  grid-template-columns: 5% 1fr;
  gap: 20px;
`;

const AppointmentDotWrapper = styled.div.attrs({ className: 'appointments-dot-wrapper' })`
  position: relative;
`;
const TreatmentItem = styled.div.attrs({ className: 'treatment-item' })``;
const AppointmentsList = styled.div.attrs({ className: 'appointments-list' })`
  padding: 0 15px;
`;

const AppointmentDot = styled.div.attrs({ className: 'appointments-dot' })`
  z-index: 99;
  background: #eff1f7;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  border: 2px solid #2d4564;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const VerticalLine = styled.div.attrs({ className: 'vertical-line' })`
  background: #2d4564;
  width: 2px;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HISTORY_TABS = [
  {
    id: 1,
    name: 'Upcoming Appointments',
  },
  {
    id: 2,
    name: 'Past Appointments',
  },
];

const ACTIVE_TAB_STYLE = {
  background: '#607086',
  color: '#ffffff',
};

const PatientHistory = ({ treatmentHistory }) => {
  const [activeTab, setActiveTab] = useState(HISTORY_TABS[0].name);

  return (
    <PatientHistoryWrapper>
      <PatientHistoryTabs>
        {HISTORY_TABS.map(historyTab => (
          <PatientHistoryTabItem
            style={activeTab === historyTab.name ? ACTIVE_TAB_STYLE : {}}
            key={historyTab.id}
            onClick={() => setActiveTab(historyTab.name)}
          >
            {historyTab.name}
          </PatientHistoryTabItem>
        ))}
      </PatientHistoryTabs>
      <PatientHistoryList>
        {treatmentHistory.map(treatment => (
          <TreatmentItem>
            <TreatmentName key={treatment.id}>{treatment.treatmentName}</TreatmentName>
            <AppointmentsList>
              {treatment.meetingsList.map(meeting => (
                <AppointmentsGrid>
                  <AppointmentDotWrapper>
                    <VerticalLine />
                    <AppointmentDot />
                  </AppointmentDotWrapper>
                  <AppointmentCard
                    date={meeting.date}
                    time={meeting.time}
                    treatmentType={meeting.treatmentType}
                    doctorName={meeting.doctorName}
                  />
                </AppointmentsGrid>
              ))}
            </AppointmentsList>
          </TreatmentItem>
        ))}
      </PatientHistoryList>
    </PatientHistoryWrapper>
  );
};

PatientHistory.propTypes = {
  treatmentHistory: PropTypes.instanceOf(Object).isRequired,
};

export default PatientHistory;
