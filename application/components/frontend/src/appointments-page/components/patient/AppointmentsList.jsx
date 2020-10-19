import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import { fetchAppointmentsList } from 'appointments-page/actions/appointmentActions';
import AppointmentstItem from 'appointments-page/components/patient/AppointmentstItem';

const AppointmentsListWrapper = styled.div.attrs({ className: 'appointments-list-wrapper' })`
  height: 100%;
  padding: 20px;
`;

const PageTitle = styled.p.attrs({ className: 'page-title' })`
  font-size: 24px;
  font-weight: 100;
`;

const SearchWrapper = styled.div.attrs({ className: 'search-wrapper' })``;

const AppointmentsCount = styled.div.attrs({ className: 'appointments-cound' })`
  font-size: 10px;
  font-weight: 100;
  marign-bottom: 10px;
`;

const SearchInput = styled.input.attrs({ className: 'search-input' })`
  width: calc(100% - 40px);
  outline: none;
  border-radius: 4px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 12px;
`;

const Appointments = styled.ul.attrs({ className: 'appointments' })`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ErrorBlock = styled.div.attrs({ className: 'error-block' })`
  padding: 20px 10px;
  margin: 5px 0;
  text-align: center;
  background: #fce7e6;
  font-size: 12px;
  color: #552526;
  width: 80%;
  margin: 20px auto;
`;

const AppointmentsList = ({ isLoading, isError, appointmentsData, fetchAppointmentsListFunc }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchAppointmentsListFunc();
  }, []);

  if (isLoading)
    return (
      <AppointmentsListWrapper>
        <ProgressIndicatorCircular />
      </AppointmentsListWrapper>
    );

  if (isError)
    return (
      <AppointmentsListWrapper>
        <ErrorBlock>There was an error while fetching appointments list</ErrorBlock>
      </AppointmentsListWrapper>
    );

  return (
    <AppointmentsListWrapper>
      <PageTitle>Appointments</PageTitle>
      <SearchWrapper>
        <SearchInput
          value={searchValue}
          onChange={evt => setSearchValue(evt.target.value)}
          placeholder="Search for appointment..."
        />
      </SearchWrapper>
      <Appointments>
        <AppointmentsCount>{`Appointments found: ${appointmentsData.length}`}</AppointmentsCount>
        {appointmentsData.map(appointment => (
          <AppointmentstItem appointment={appointment} />
        ))}
      </Appointments>
    </AppointmentsListWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appointmentsList.appointments.isLoading,
  isError: state.appointmentsList.appointments.isError,
  appointmentsData: state.appointmentsList.appointments.data,
});

const mapDispatchToProps = dispatch => ({
  fetchAppointmentsListFunc: () => dispatch(fetchAppointmentsList()),
});

AppointmentsList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  fetchAppointmentsListFunc: PropTypes.func.isRequired,
  appointmentsData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsList);
