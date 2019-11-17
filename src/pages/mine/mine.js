/*
 * @Description: 我的页面
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-13 08:30:07
 * @LastEditTime: 2019-11-13 08:51:30
 */

import React, { Component } from "react";
import ComponentList from "@/components/Question/component-list";

export default class Mine extends Component {
  render() {
    return (
      <div className="mine">
        <section className="mine-header">
          <div className="mine-header__avator"></div>
          <div className="mine-header__name">小明</div>
        </section>
        <section className="mine-question">
          <h4 className="mine-question__title">questionList</h4>
          <div className="mine-question__list">
            <ComponentList />
          </div>
        </section>
      </div>
    );
  }
}