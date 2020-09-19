import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';

import commonReducer from 'common/reducers';
import messagesReducer from 'messages-page/reducers';
import diagnoseReducer from 'initial-diagnose/reducers';

export const history = createBrowserHistory();

const middleware = [thunkMiddleware, routerMiddleware(history)];

let composeEnhancers = compose;

if (
  process.env.NODE_ENV === 'development' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const rootReducer = combineReducers({
  router: connectRouter(history),
  common: commonReducer,
  messages: messagesReducer,
  diagnose: diagnoseReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
