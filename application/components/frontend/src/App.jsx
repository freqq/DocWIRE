import React, { Fragment } from 'react';
import { store, history } from 'store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import RootRouter from 'RootRouter';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <RootRouter />
      </Fragment>
    </ConnectedRouter>
  </Provider>
);

export default App;
