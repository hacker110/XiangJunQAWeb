/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-10 09:43:29
 */
// @flow
import React, { Component } from 'react';

class ListItem extends Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, title } = this.props.data;
    return (
      <div className="list-item">
        <div>{id}</div>
        <div>{title}</div>
      </div>
    );
  }
}

export default ListItem;
