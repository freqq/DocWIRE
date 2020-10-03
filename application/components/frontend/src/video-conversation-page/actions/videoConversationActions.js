import { appointmentDetails } from 'video-conversation-page/handlers/videoConversationHandler';

export const CONNECT_TO_APPOINTMENT_PENDING = 'CONNECT_TO_APPOINTMENT_PENDING';
export const CONNECT_TO_APPOINTMENT_OK = 'CONNECT_TO_APPOINTMENT_OK';
export const CONNECT_TO_APPOINTMENT_FAIL = 'CONNECT_TO_APPOINTMENT_FAIL';

export const makeConnectToAppointmentPending = () => ({
  type: CONNECT_TO_APPOINTMENT_PENDING,
});

export const makeConnectToAppointmentOk = appointmentData => ({
  type: CONNECT_TO_APPOINTMENT_OK,
  payload: { appointmentData },
});

export const makeConnectToAppointmentFail = () => ({
  type: CONNECT_TO_APPOINTMENT_FAIL,
});

export const getAppointmentDetails = appointmentId => dispatch => {
  dispatch(makeConnectToAppointmentPending());

  return appointmentDetails(appointmentId)
    .then(res => {
      dispatch(makeConnectToAppointmentOk(res.data));
    })
    .catch(() => {
      dispatch(makeConnectToAppointmentFail());
    });
};
