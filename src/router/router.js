/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-05 08:51:42
 * @LastEditTime: 2019-11-06 23:00:28
 */
//  , { Suspense }
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes.js';

const router = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, id) => {
          const { component: RouteComponent, children, path } = route;
          return (
            <Route
              key={id}
              path={path}
              render={props => {
                return (
                  <RouteComponent key={id} {...props}>
                    <Switch>
                      {children.length &&
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
