/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-23 13:57:29
 */
// @flow
import React, { Component } from "react";
import QuestionItem from "./question-item";
import "@scss/home.scss";

class ComponentList extends Component<{}, {}> {

  render() {
    const { data = [] } = this.props;
    return (
      <div className="componentlist">
        {data.map((item, index) => {
          return <QuestionItem key={index} data={item} />;
        })}
      </div>
    );
  }
}

export default ComponentList;
