/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-06 20:45:58
 */
// @flow
import { Component } from 'react';
import '@commonScss/index.scss';

import router from './router/router.js';

class App extends Component<{}, {}> {
  render() {
    return router();
  }
}

export default App;
