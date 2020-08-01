import React from 'react';
import { store, history } from 'store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createGlobalStyle } from 'styled-components';
import RootRouter from 'RootRouter';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Roboto-Light", sans-serif !important;
  }
`;

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <GlobalStyle />
        <RootRouter />
      </>
    </ConnectedRouter>
  </Provider>
);

export default App;
