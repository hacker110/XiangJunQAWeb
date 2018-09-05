// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '@comp/home';
import Page404 from '@commonComp/page404';
import '@commonScss/index.scss';

class App extends Component<{}, {}> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/*" component={Page404} />
        </Switch>
      </Router>
    )
  }
}

export default App;
