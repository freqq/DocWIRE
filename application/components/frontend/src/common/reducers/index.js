import { combineReducers } from 'redux';

import lockScreenReducer from 'common/reducers/lockScreenReducer';
import authUserReducer from 'common/reducers/authUserReducer';

export default combineReducers({
  applicationScreen: lockScreenReducer,
  authUser: authUserReducer,
});
