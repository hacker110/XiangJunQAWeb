/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-10 09:43:04
 */
// @flow
import React, { Component } from 'react';
import ListItem from './list-item';
import '@scss/home.scss';

class ComponentList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: 1, title: 'item1' },
        { id: 2, title: 'item2' },
        { id: 3, title: 'item3' },
        { id: 4, title: 'item4' }
      ]
    };
  }

  render() {
    const { list } = this.state;
    return (
      <div className="componentlist">
        {list.map(item => {
          return <ListItem key={item.id} data={item} />;
        })}
      </div>
    );
  }
}

export default ComponentList;
