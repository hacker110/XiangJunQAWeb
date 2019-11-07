/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-05 08:51:42
 * @LastEditTime: 2019-11-07 00:11:51
 */
//  , { Suspense }
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import routes from './routes.js';

const router = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, id) => {
          const { component: RouteComponent, children, path, redirect } = route;
          return redirect ? (
            <Redirect exact key={id} from={path} to={redirect}></Redirect>
          ) : (
            <Route
              key={id}
              path={path}
              render={props => {
                return (
                  <RouteComponent key={id} {...props}>
                    <Switch>
                      {children &&
                        children.length &&
                        children.map((routeChild, idx) => {
                          return (
                            <Route key={idx} exact {...routeChild}></Route>
                          );
                        })}
                    </Switch>
                  </RouteComponent>
                );
              }}
            ></Route>
          );
        })}
      </Switch>
    </Router>
  );
};
export default router;
