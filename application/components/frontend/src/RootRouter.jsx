import React from 'react';
import { Route, Switch } from 'react-router-dom';
import getPath from 'common/utils/path';
import makeLoadable from 'common/utils/loadable';
import NotFoundPage from 'common/components/NotFoundPage';

export const ROOT_PATH = getPath('/');

export const LoadableMainPage = makeLoadable(() => import('main-page/containers/MainPage'));

const RootRouter = () => (
  <Switch>
    <Route exact path={ROOT_PATH} component={LoadableMainPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RootRouter;
