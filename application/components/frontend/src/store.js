import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';

export const history = createBrowserHistory();

const middleware = [thunkMiddleware, routerMiddleware(history)];

let composeEnhancers = compose;

/* eslint-disable no-underscore-dangle */
if (
  process.env.NODE_ENV === 'development' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}
/* eslint-enable no-underscore-dangle */

const rootReducer = combineReducers({
  router: routerReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
