import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import UserSection from 'common/components/layout/navbar/UserSection';
import { getRecentAppointment } from 'dashboard-page/actions/dashboardActions';
import { MONTH_FULL_NAMES, WEEK_DAYS_NAMES } from 'common/utils/date_constants';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

import cancelIcon from 'images/icons/close.svg';
import detailsIcon from 'images/icons/details.svg';

const AppointmentsWrapper = styled.div.attrs({ className: 'appointments-wrapper' })`
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const CardTitle = styled.div.attrs({ className: 'card-title' })`
  border-bottom: 1px solid #f0f0f0;
  padding: 10px;
  font-weight: 400;
  font-size: 15px;
`;

const SeeAllButton = styled(Link).attrs({ className: 'see-all-button' })`
  float: right;
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: 100;
  background: #ffffff;
  padding: 3px 10px;
  font-size: 10px;
  transition: 0.2s;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  &:hover {
    opacity: 0.6;
  }
`;

const CardContent = styled.div.attrs({ className: 'card-content' })`
  padding: 10px 25px;
  font-size: 12px;
  font-weight: 100;
  height: calc(100% - 55px);
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
`;

const TwoSideGrid = styled.div.attrs({ className: 'two-side-grid' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
`;

const ActionButtons = styled.div.attrs({ className: 'action-buttons' })`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
`;

const ActionButton = styled.button.attrs({ className: 'action-button' })`
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: 100;
  background: #ffffff;
  padding: 10px;
  font-size: 11px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const ActionLink = styled(Link).attrs({ className: 'action-link' })`
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  font-weight: 100;
  background: #ffffff;
  padding: 10px;
  font-size: 11px;
  transition: 0.2s;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  &:hover {
    opacity: 0.6;
  }
`;

const GridElement = styled.div.attrs({ className: 'grid-element' })``;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 400;
  margin-bottom: 5px;
`;

const Content = styled.div.attrs({ className: 'content' })`
  font-weight: 100;
`;

const ButtonIcon = styled.img.attrs({ className: 'button-icon' })`
  height: 12px;
  margin-right: 5px;
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

const Appointments = ({ isLoading, isError, data, getRecentAppointmentFunc }) => {
  useEffect(() => {
    getRecentAppointmentFunc();
  }, []);

  const cancelBooking = () => console.log('cancelBooking');

  if (isError)
    return (
      <AppointmentsWrapper>
        <CardTitle>
          Recent appointment
          <SeeAllButton>See all</SeeAllButton>
        </CardTitle>
        <CardContent>
          <ErrorBlock>There was an erorr while fetching recent appointment data</ErrorBlock>
        </CardContent>
      </AppointmentsWrapper>
    );

  const getDoctorFirstName = () => data.appointmentData.doctor.firstName;

  const getDoctorLastName = () => data.appointmentData.doctor.lastName;

  const getDoctorSpecialization = () => data.appointmentData.doctor.doctorInfo.specialization;

  const getAppointmentDate = () => {
    const chosenDate = moment(data.appointmentData.appointmentDate);

    const year = chosenDate.year();
    const monthName = MONTH_FULL_NAMES[chosenDate.month()];
    const day = chosenDate.date();
    const dayOfWeek = WEEK_DAYS_NAMES[chosenDate.day()];

    return `${dayOfWeek} ${day} ${monthName}, ${year}`;
  };

  const leadingZeros = param => (param < 10 ? '0' : '') + param;

  const getAppointmentTime = () => {
    const chosenDate = moment(data.appointmentData.appointmentDate);
    const chosenDateEnd = moment(data.appointmentData.appointmentDate).add('30', 'minutes');

    const hour = leadingZeros(chosenDate.hour());
    const minutes = leadingZeros(chosenDate.minutes());

    const hourEnd = leadingZeros(chosenDateEnd.hour());
    const minutesEnd = leadingZeros(chosenDateEnd.minutes());

    return `${hour}:${minutes} - ${hourEnd}:${minutesEnd}`;
  };

  return (
    <AppointmentsWrapper>
      <CardTitle>
        Recent appointment
        <SeeAllButton to="/appointments">See all</SeeAllButton>
      </CardTitle>
      <CardContent>
        {isLoading ? (
          <ProgressIndicatorCircular />
        ) : (
          <>
            <UserSection
              userId={data.appointmentData.doctor.userId}
              firstName={getDoctorFirstName()}
              lastName={getDoctorLastName()}
              bottomText={getDoctorSpecialization()}
              showIcon={false}
              circleSize={30}
              circleFontSize={10}
            />
            <TwoSideGrid>
              <GridElement>
                <Title>Date</Title>
                <Content>{getAppointmentDate()}</Content>
              </GridElement>
              <GridElement>
                <Title>Time</Title>
                <Content>{getAppointmentTime()}</Content>
              </GridElement>
            </TwoSideGrid>
            <ActionButtons>
              <ActionButton onClick={cancelBooking}>
                <ButtonIcon src={cancelIcon} alt="cancelIcon" />
                Cancel Booking
              </ActionButton>
              <ActionLink to={`/appointments/${data.appointmentData.id}`}>
                <ButtonIcon src={detailsIcon} alt="detailsIcon" />
                See details
              </ActionLink>
            </ActionButtons>
          </>
        )}
      </CardContent>
    </AppointmentsWrapper>
  );
};

Appointments.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  data: PropTypes.bool.isRequired,
  getRecentAppointmentFunc: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.dashboard.recentAppointment.isLoading,
  isError: state.dashboard.recentAppointment.isError,
  data: state.dashboard.recentAppointment.data,
});

const mapDispatchToProps = dispatch => ({
  getRecentAppointmentFunc: () => dispatch(getRecentAppointment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
