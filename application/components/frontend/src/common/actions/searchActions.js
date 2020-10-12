import searchQuery from 'common/handlers/searchHandler';

export const SEARCH_FETCHING = 'SEARCH_FETCHING';
export const SEARCH_OK = 'SEARCH_OK';
export const SEARCH_FAIL = 'SEARCH_FAIL';

export const makeSearchFetching = () => ({
  type: SEARCH_FETCHING,
});

export const makeSearchFail = () => ({
  type: SEARCH_FAIL,
});

export const makeSearchOk = searchData => ({
  type: SEARCH_OK,
  payload: { searchData },
});

export const getSearch = query => dispatch => {
  dispatch(makeSearchFetching());

  return searchQuery(query)
    .then(res => {
      dispatch(makeSearchOk(res.data));
    })
    .catch(() => {
      dispatch(makeSearchFail());
    });
};
