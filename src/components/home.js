/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-06 23:04:04
 */
// @flow
import React from 'react';

import '@scss/home.scss';

export default function Home(props) {
  console.log(props);
  return <div className="home-page">{props.children}</div>;
}
