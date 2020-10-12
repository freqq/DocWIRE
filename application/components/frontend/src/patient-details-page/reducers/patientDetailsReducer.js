import {
  FETCH_PATIENT_DETAILS_PENDING,
  FETCH_PATIENT_DETAILS_OK,
  FETCH_PATIENT_DETAILS_FAIL,
  CREATE_NEW_NOTE_PENDING,
  CREATE_NEW_NOTE_OK,
  CREATE_NEW_NOTE_FAIL,
} from 'patient-details-page/actions/patientActions';

const INITIAL_STATE = {
  data: undefined,
  isLoading: true,
  isError: false,
  notes: undefined,
  isNotesLoading: false,
  isNotesError: false,
};

const fetchPending = state => ({
  ...state,
  data: undefined,
  notes: undefined,
  isError: false,
  isLoading: true,
});

const fetchFail = state => ({
  ...state,
  data: undefined,
  notes: undefined,
  isError: true,
  isLoading: false,
});

const fetchOk = (state, action) => ({
  ...state,
  data: action.payload,
  notes: action.payload.patientData.noteResponses.reverse(),
  isError: false,
  isLoading: false,
});

const notePending = state => ({
  ...state,
  isNotesError: false,
  isNotesLoading: true,
});

const noteFail = state => ({
  ...state,
  isNotesError: true,
  isNotesLoading: false,
});

const noteOk = (state, action) => ({
  ...state,
  notes: [action.payload.noteData, ...state.notes],
  isNotesError: false,
  isNotesLoading: false,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case FETCH_PATIENT_DETAILS_OK:
      return fetchOk(stateDefinition, action);
    case FETCH_PATIENT_DETAILS_PENDING:
      return fetchPending(stateDefinition);
    case FETCH_PATIENT_DETAILS_FAIL:
      return fetchFail(stateDefinition);
    case CREATE_NEW_NOTE_OK:
      return noteOk(stateDefinition, action);
    case CREATE_NEW_NOTE_PENDING:
      return notePending(stateDefinition);
    case CREATE_NEW_NOTE_FAIL:
      return noteFail(stateDefinition);
    default:
      return stateDefinition;
  }
};
