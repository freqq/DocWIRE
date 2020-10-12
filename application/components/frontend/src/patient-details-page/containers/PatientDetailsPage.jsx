import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPatientDetails } from 'patient-details-page/actions/patientActions';
import PatientDetailsGridLeftSide from 'patient-details-page/containers/PatientDetailsGridLeftSide';
import PatientDetailsGridRightSide from 'patient-details-page/containers/PatientDetailsGridRightSide';
import PatientDetailsBreadcrumb from 'patient-details-page/components/PatientDetailsBreadcrumb';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const PatientDetailsPageWrapper = styled.div.attrs({ className: 'patient-details-page-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
  overflow: hidden;
`;

const PatientDetailsGrid = styled.div.attrs({ className: 'patient-details-grid' })`
  display: grid;
  grid-template-columns: 60% 40%;
  height: calc(100% - 56px);
  overflow: hidden;
  font-size: 12px;
  gap: 20px;
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

const TREATMENT_HISTORY = [
  {
    id: 1,
    treatmentName: 'Root Canal Treatment',
    meetingsList: [
      {
        id: 2,
        date: "26 Nov'19",
        time: '09:00 - 10:00',
        treatmentType: 'Open Access',
        doctorName: 'Drag Piotr',
      },
      {
        id: 3,
        date: "12 Sep'19",
        time: '14:15 - 14:45',
        treatmentType: 'Root Canal prep',
        doctorName: 'Wasik Magdalena',
      },
    ],
  },
  {
    id: 4,
    treatmentName: 'Boobs job',
    meetingsList: [
      {
        id: 5,
        date: "26 Nov'19",
        time: '09:00 - 10:00',
        treatmentType: 'Open Access',
        doctorName: 'Drag Piotr',
      },
      {
        id: 6,
        date: "12 Sep'19",
        time: '14:15 - 14:45',
        treatmentType: 'Root Canal prep',
        doctorName: 'Wasik Magdalena',
      },
    ],
  },
];

const PatientDetailsPage = ({ isLoading, isError, data, getPatientDetailsFunc, match }) => {
  useEffect(() => {
    const {
      params: { patientId },
    } = match;

    getPatientDetailsFunc(patientId);
  }, []);

  const getFullName = () => `${data.patientData.firstName} ${data.patientData.lastName}`;

  const getEmail = () =>
    `${data.patientData.firstName.toLowerCase()}.${data.patientData.lastName.toLowerCase()}@docwire.com`;

  const getDayOfBirth = () => 'Feb 24th, 1997';

  const camelize = str => str.substring(0, 1).toUpperCase() + str.substring(1);

  const createPatientDataArray = () => [
    {
      id: 1,
      title: 'Gender',
      content: camelize(data.patientData.gender.toLowerCase()),
    },
    {
      id: 2,
      title: 'Birthday',
      content: getDayOfBirth(),
    },
    {
      id: 3,
      title: 'Weight',
      content: data.patientData.patientInfo.weight,
    },
    {
      id: 4,
      title: 'Height',
      content: data.patientData.patientInfo.height,
    },
    {
      id: 5,
      title: 'Street Address',
      content: data.patientData.patientInfo.address,
    },
    {
      id: 6,
      title: 'City',
      content: data.patientData.patientInfo.city,
    },
    {
      id: 7,
      title: 'ZIP Code',
      content: data.patientData.patientInfo.zipCode,
    },
    {
      id: 8,
      title: 'Country',
      content: data.patientData.patientInfo.country,
    },
  ];

  if (isError)
    return (
      <PatientDetailsPageWrapper>
        <ErrorBlock>There was an error while fetching patient details.</ErrorBlock>
      </PatientDetailsPageWrapper>
    );

  return (
    <PatientDetailsPageWrapper>
      {isLoading ? (
        <ProgressIndicatorCircular />
      ) : (
        <>
          <PatientDetailsBreadcrumb patientName={getFullName()} />
          <PatientDetailsGrid>
            <PatientDetailsGridLeftSide
              firstName={data.patientData.firstName}
              lastName={data.patientData.lastName}
              email={getEmail()}
              treatmentHistory={TREATMENT_HISTORY}
              patientData={createPatientDataArray()}
            />
            <PatientDetailsGridRightSide />
          </PatientDetailsGrid>
        </>
      )}
    </PatientDetailsPageWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.patient.patientDetails.isLoading,
  isError: state.patient.patientDetails.isError,
  data: state.patient.patientDetails.data,
});

const mapDispatchToProps = dispatch => ({
  getPatientDetailsFunc: patientId => dispatch(getPatientDetails(patientId)),
});

PatientDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      patientId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  getPatientDetailsFunc: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsPage);
