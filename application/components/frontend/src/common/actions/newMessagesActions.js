import fetchMessagesCount from 'common/handlers/newMessagesHandler';

export const FETCH_MESSAGES_COUNT_PENDING = 'FETCH_MESSAGES_COUNT_PENDING';
export const FETCH_MESSAGES_COUNT_OK = 'FETCH_MESSAGES_COUNT_OK';
export const FETCH_MESSAGES_COUNT_FAIL = 'FETCH_MESSAGES_COUNT_FAIL';

export const INCREASE_MESSAGES_COUNT = 'INCREASE_MESSAGES_COUNT';

export const makeIncreaseUnreadMessages = () => ({
  type: INCREASE_MESSAGES_COUNT,
});

export const makeFetchMessagesCountPending = () => ({
  type: FETCH_MESSAGES_COUNT_PENDING,
});

export const makeFetchMessagesCountOk = messagesCount => ({
  type: FETCH_MESSAGES_COUNT_OK,
  payload: { messagesCount },
});

export const makeFetchMessagesCountFail = () => ({
  type: FETCH_MESSAGES_COUNT_FAIL,
});

export const getUnreadMessagesCount = () => dispatch => {
  dispatch(makeFetchMessagesCountPending());

  return fetchMessagesCount()
    .then(res => {
      dispatch(makeFetchMessagesCountOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchMessagesCountFail());
    });
};

export const increaseUnreadMesssages = () => dispatch => {
  dispatch(makeIncreaseUnreadMessages());
};
