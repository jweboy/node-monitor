/*
 * @Author: jweboy
 * @Date: 2019-11-01 23:21:05
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-09 22:01:12
 */
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { InterfaceList, InterfaceDetail, CodeList, CodeDetail } from './config';

const AppRouter: React.FC = () => (
  <Switch>
    <Route exact path="/" render={() => (<Redirect to="/interface/list?status=succeed" />)} />
    <Route path="/interface/list" component={InterfaceList} />
    <Route path="/interface/detail/:id" component={InterfaceDetail} />
    <Route path="/code/list" component={CodeList} />
    <Route path="/code/detail/:id" component={CodeDetail} />
  </Switch>
);

export default AppRouter;
