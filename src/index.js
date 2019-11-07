/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-06 23:14:23
 */
// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'antd-mobile/dist/antd-mobile.css';

const root = document.getElementById('root');
if(root) ReactDOM.render(<App />, root);
registerServiceWorker();
