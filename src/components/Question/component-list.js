/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-16 14:25:14
 */
// @flow
import React, { Component } from "react";
import QuestionItem from "./question-item";
import "@scss/home.scss";

class ComponentList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: 1, title: "item1" },
        { id: 2, title: "item2" },
        { id: 3, title: "item3" },
        { id: 4, title: "item4" }
      ]
    };
    this.getData();
  }

  getData() {
    const { tabIndex, subTabIndex } = this.props;
    console.log("当前数据",tabIndex, subTabIndex);
  }

  render() {
    const { list } = this.state;
    return (
      <div className="componentlist">
        {list.map(item => {
          return <QuestionItem key={item.id} data={item} />;
        })}
      </div>
    );
  }
}

export default ComponentList;
