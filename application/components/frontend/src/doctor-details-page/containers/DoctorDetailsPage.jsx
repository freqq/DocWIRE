import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getDoctorDetails } from 'doctor-details-page/actions/doctorActions';
import DoctorDetailsGridLeftSide from 'doctor-details-page/components/DoctorDetailsGridLeftSide';
import DoctorDetailsBreadcrumb from 'doctor-details-page/components/DoctorDetailsBreadcrumb';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const DoctorDetailsPageWrapper = styled.div.attrs({ className: 'doctor-details-page-wrapper' })`
  width: calc(100% - 50px);
  height: calc(100vh - 70px - 40px);
  padding: 20px 25px;
  overflow: hidden;
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

const DoctorDetailsPage = ({ isLoading, isError, data, getDoctorDetailsFunc, match }) => {
  useEffect(() => {
    const {
      params: { doctorId },
    } = match;

    getDoctorDetailsFunc(doctorId);
  }, []);

  const getFullName = () => `${data.doctorInfo.title} ${data.firstName} ${data.lastName}`;

  const getEmail = () =>
    `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@docwire.com`;

  const getDayOfBirth = () => 'Feb 24th, 1997';

  const camelize = str => str.substring(0, 1).toUpperCase() + str.substring(1);

  const createDoctorDataArray = () => [
    {
      id: 1,
      title: 'Gender',
      content: camelize(data.gender.toLowerCase()),
    },
    {
      id: 2,
      title: 'About me',
      content: data.doctorInfo.aboutMe,
    },
    {
      id: 3,
      title: 'Specialization',
      content: data.doctorInfo.specialization,
    },
    {
      id: 4,
      title: 'Price',
      content: data.doctorInfo.price,
    },
    {
      id: 5,
      title: 'Birthday',
      content: getDayOfBirth(),
    },
    {
      id: 6,
      title: 'Rating',
      content: data.rating !== 0 ? data.rating : 'N/A',
    },
  ];

  if (isError)
    return (
      <DoctorDetailsPageWrapper>
        <ErrorBlock>There was an error while fetching doctor details.</ErrorBlock>
      </DoctorDetailsPageWrapper>
    );

  return (
    <DoctorDetailsPageWrapper>
      {isLoading ? (
        <ProgressIndicatorCircular />
      ) : (
        <>
          <DoctorDetailsBreadcrumb doctorName={getFullName()} />
          <DoctorDetailsGridLeftSide
            reviews={data.reviewResponses}
            firstName={data.firstName}
            lastName={data.lastName}
            email={getEmail()}
            doctorData={createDoctorDataArray()}
          />
        </>
      )}
    </DoctorDetailsPageWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: state.doctor.doctorDetails.isLoading,
  isError: state.doctor.doctorDetails.isError,
  data: state.doctor.doctorDetails.data,
});

const mapDispatchToProps = dispatch => ({
  getDoctorDetailsFunc: doctorId => dispatch(getDoctorDetails(doctorId)),
});

DoctorDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      doctorId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  getDoctorDetailsFunc: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetailsPage);
