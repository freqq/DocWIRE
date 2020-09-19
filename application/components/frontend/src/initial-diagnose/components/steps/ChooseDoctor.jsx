/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import GenericStep from 'initial-diagnose/components/GenericStep';
import StarsRating from 'common/components/StarsRating';
import { fetchDoctorsList } from 'initial-diagnose/actions/diagnoseActions';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';
import searchIcon from 'images/icons/search.svg';
import scheduleOnlineIcon from 'images/icons/scheduleOnline.svg';
import newPatientsIcon from 'images/icons/newPatients.svg';

const DoctorSearch = styled.div.attrs({ className: 'doctor-search' })`
  display: block;
  width: 80%;
  height: 90%;
  margin: 0 auto;
`;

const InputSearchWrapper = styled.div.attrs({ className: 'input-search-wrapper' })`
  position: relative;
  width: 100%;
  margin-top: 10px;
`;

const InputElement = styled.input.attrs({ className: 'input-element' })`
  width: calc(100% - 24px);
  padding: 12px;
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  font-size: 11px;
`;

const InputIcon = styled.img.attrs({ className: 'input-icon' })`
  position: absolute;
  top: 12px;
  right: 10px;
  width: 13px;
`;

const DoctorData = styled.div.attrs({ className: 'doctor-data' })`
  text-align: left;
`;

const Rating = styled.div.attrs({ className: 'rating' })`
  display: flex;
`;

const BookAppointment = styled.div.attrs({ className: 'book-appointment' })`
  text-align: right;
`;

const Name = styled.div.attrs({ className: 'name' })`
  font-weight: 100;
  font-size: 14px;
`;

const Title = styled.div.attrs({ className: 'title' })`
  font-weight: 100;
  font-size: 10px;
  margin: 5px 0;
`;

const Price = styled.div.attrs({ className: 'price' })`
  font-weight: 100;
  font-size: 18px;
`;

const RatingCount = styled.div.attrs({ className: 'rating-count' })`
  font-weight: 100;
  font-size: 10px;
  margin-left: 5px;
  line-height: 19px;
`;

const DoctorsList = styled.ul.attrs({ className: 'doctors-list' })`
  list-style-type: none;
  padding: 0;
  overflow-y: scroll;
  width: 80%;
  margin: 0 auto;
  overflow-x: hidden;
  max-height: 35vh;
`;

const ListOfItems = styled.ul.attrs({ className: 'list-of-items' })`
  list-style-type: none;
  margin: 10px 0 0 0;
  padding: 0;
`;

const ItemElement = styled.ul.attrs({ className: 'item-element' })`
  margin: 0;
  padding: 0 0 10px 0;
  display: flex;
`;

const Icon = styled.img.attrs({ className: 'icon' })`
  width: 12px;
  margin-right: 5px;
`;

const Text = styled.div.attrs({ className: 'text' })`
  line-height: 12px;
  font-size: 10px;
  font-weight: 100;
`;

const FoundEntries = styled.div.attrs({ className: 'found-entries' })`
  font-size: 12px;
  font-weight: 100;
  width: 80%;
  margin: 10px auto 0 auto;
`;

const ScheduleButton = styled.button.attrs({ className: 'schedule-button' })`
  outline: none;
  border: none;
  border-radius: 4px;
  color: #fff;
  background: #2d4564;
  padding: 10px;
  transition: 0.2s;
  font-size: 10px;
  font-weight: 100;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const DoctorsListItem = styled.li.attrs({ className: 'doctors-list-item' })`
  padding: 15px;
  font-size: 12px;
  display: grid;
  grid-template-columns: 10% 1fr 30%;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  &:last-child {
    border: none;
  }
`;

const UserCircle = styled.div.attrs({ className: 'user-circle' })`
  display: block;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  line-height: 45px;
  margin-right: 10px;
  color: #ffffff;
  background: #2d4564;
  text-align: center;
  font-size: 14px;
  font-weight: 100;
`;

const LIST_OF_ITEMS = [
  {
    id: 1,
    text: 'Accepting New Patients',
    icon: newPatientsIcon,
  },
  {
    id: 2,
    text: 'Schedule Online',
    icon: scheduleOnlineIcon,
  },
];

const ChooseDoctor = ({
  currentStep,
  totalSteps,
  fetchDoctorsListFunc,
  isLoading,
  isError,
  doctorsList,
  nextStep,
  setDoctor,
  setCurrentStepNumber,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const getCircleText = (firstName, lastName) =>
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

  const onSearchChange = value => {
    setCurrentStepNumber(currentStep + 1);
    fetchDoctorsListFunc(value);
    setSearchValue(value);
  };

  const shouldShowEntriesCount = () => doctorsList !== undefined && searchValue.length > 0;

  const getEntriesCount = () => doctorsList.length;

  const onDoctorClick = doctor => {
    setDoctor(doctor);
    nextStep();
  };

  return (
    <GenericStep stepName="Choose your doctor" currentStep={currentStep} totalSteps={totalSteps}>
      <DoctorSearch>
        <InputSearchWrapper>
          <InputElement
            value={searchValue}
            onChange={evt => onSearchChange(evt.target.value)}
            placeholder="Search for doctors, specializations or more..."
          />
          <InputIcon src={searchIcon} alt="searchIcon" />
        </InputSearchWrapper>
        {isLoading ? (
          <ProgressIndicatorCircular />
        ) : (
          <>
            {shouldShowEntriesCount() && (
              <FoundEntries>{`${getEntriesCount()} entries found`}</FoundEntries>
            )}
            <DoctorsList>
              {doctorsList !== undefined &&
                doctorsList.map(doctor => (
                  <DoctorsListItem key={doctor.id}>
                    <UserCircle>{getCircleText(doctor.firstName, doctor.lastName)}</UserCircle>
                    <DoctorData>
                      <Name>{getFullName(doctor.firstName, doctor.lastName)}</Name>
                      <Title>{doctor.doctorInfo.specialization}</Title>
                      <Rating>
                        <StarsRating rating={doctor.rating} id={doctor.id} />
                        <RatingCount>{`${doctor.ratingCount} reviews`}</RatingCount>
                      </Rating>
                      <ListOfItems>
                        {LIST_OF_ITEMS.map(item => (
                          <ItemElement id={item.id}>
                            <Icon src={item.icon} alt="item-icon" />
                            <Text>{item.text}</Text>
                          </ItemElement>
                        ))}
                      </ListOfItems>
                    </DoctorData>
                    <BookAppointment>
                      <Price>{`${doctor.doctorInfo.price}$`}</Price>
                      <ScheduleButton>Schedule video call</ScheduleButton>
                    </BookAppointment>
                  </DoctorsListItem>
                ))}
            </DoctorsList>
          </>
        )}
      </DoctorSearch>
    </GenericStep>
  );
};

ChooseDoctor.defaultProps = {
  currentStep: null,
  totalSteps: null,
};

ChooseDoctor.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  fetchDoctorsListFunc: PropTypes.func.isRequired,
  setCurrentStepNumber: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  setDoctor: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  doctorsList: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.diagnose.chooseDoctor.isFetching,
  isError: state.diagnose.chooseDoctor.isError,
  doctorsList: state.diagnose.chooseDoctor.doctorsList,
});

const mapDispatchToProps = dispatch => ({
  fetchDoctorsListFunc: searchQuery => dispatch(fetchDoctorsList(searchQuery)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDoctor);
