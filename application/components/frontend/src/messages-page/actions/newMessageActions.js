import fetchUsers from 'messages-page/handlers/newMessageHandlers';

export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_OK = 'FETCH_USERS_OK';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';

export const makeFetchUsersPending = () => ({
  type: FETCH_USERS_PENDING,
});

export const makeFetchUsersOk = (usersData, currentUserId) => ({
  type: FETCH_USERS_OK,
  payload: { usersData, currentUserId },
});

export const makeFetchUsersFail = () => ({
  type: FETCH_USERS_FAIL,
});

export const makeSetCurrentChat = person => ({
  type: SET_CURRENT_CHAT,
  payload: { person },
});

export const fetchUsersList = (searchQuery, currentUserId) => dispatch => {
  dispatch(makeFetchUsersPending());

  return fetchUsers(searchQuery)
    .then(res => {
      dispatch(makeFetchUsersOk(res.data, currentUserId));
    })
    .catch(() => {
      dispatch(makeFetchUsersFail());
    });
};

export const setCurrentChat = person => dispatch => {
  dispatch(makeSetCurrentChat(person));
};
