import React, { Fragment } from 'react';
import { store, history } from 'store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import RootRouter from 'RootRouter';
import { injectGlobal } from 'styled-components';

/* eslint-disable no-unused-expressions */
injectGlobal`
  body {
    margin: 0;
    font-family: "Roboto-Light", sans-serif !important;
  }
`;
/* eslint-enable no-unused-expressions */

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
