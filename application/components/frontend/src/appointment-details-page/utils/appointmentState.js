export const APPOINTMENT_STATES = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  PAID: 'PAID',
  CANCELED: 'CANCELED',
  FINISHED: 'FINISHED',
};

export const getAppointmentStateText = state => {
  switch (state) {
    case APPOINTMENT_STATES.REQUESTED:
      return 'Awaiting for doctor to accept an appointment request...';
    case APPOINTMENT_STATES.ACCEPTED:
      return 'Awaiting for patient booking and payment...';
    case APPOINTMENT_STATES.PAID:
      return 'Appointment payment completed, waiting for the booked meeting...';
    case APPOINTMENT_STATES.CANCELED:
      return 'Appointment was cancelled.';
    case APPOINTMENT_STATES.FINISHED:
      return 'Appointment finished.';
    default:
      return 'There was an error with appointment state.';
  }
};

export const getCurrentStepNumber = state => {
  switch (state) {
    case APPOINTMENT_STATES.REQUESTED:
      return 0;
    case APPOINTMENT_STATES.ACCEPTED:
      return 1;
    case APPOINTMENT_STATES.PAID:
      return 2;
    case APPOINTMENT_STATES.FINISHED:
      return 3;
    case APPOINTMENT_STATES.CANCELED:
      return 10;
    default:
      return 100;
  }
};
