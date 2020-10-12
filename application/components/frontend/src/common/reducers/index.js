import { combineReducers } from 'redux';

import lockScreenReducer from 'common/reducers/lockScreenReducer';
import authUserReducer from 'common/reducers/authUserReducer';
import accountReducer from 'common/reducers/accountReducer';
import searchReducer from 'common/reducers/searchReducer';

export default combineReducers({
  applicationScreen: lockScreenReducer,
  authUser: authUserReducer,
  accountData: accountReducer,
  search: searchReducer,
});
