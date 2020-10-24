import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PatientAppointmentCard from 'appointments-page/components/PatientAppointmentCard';

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

const AppointmentsGrid = styled.div.attrs({ className: 'appointments-grid' })`
  display: grid;
  grid-template-columns: 5% 1fr;
  gap: 20px;
`;

const AppointmentDotWrapper = styled.div.attrs({ className: 'appointments-dot-wrapper' })`
  position: relative;
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

const PatientHistory = ({ data }) => (
  <PatientHistoryWrapper>
    <PatientHistoryTabs>Recent appointments</PatientHistoryTabs>
    <PatientHistoryList>
      {data.patientData.appointmentResponses.map(appointment => (
        <AppointmentsGrid>
          <AppointmentDotWrapper>
            <VerticalLine />
            <AppointmentDot />
          </AppointmentDotWrapper>
          <PatientAppointmentCard
            appointmentDate={appointment.appointmentDate}
            doctorData={appointment.doctorData}
            appointmentState={appointment.appointmentState}
            appointmentId={appointment.appointmentId}
          />
        </AppointmentsGrid>
      ))}
    </PatientHistoryList>
  </PatientHistoryWrapper>
);

const mapStateToProps = state => ({
  isLoading: state.patient.patientDetails.isNotesLoading,
  isError: state.patient.patientDetails.isNotesError,
  notesData: state.patient.patientDetails.notes,
  data: state.patient.patientDetails.data,
});

PatientHistory.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(PatientHistory);
