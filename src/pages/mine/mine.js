/*
 * @Description: 我的页面
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-13 08:30:07
 * @LastEditTime: 2019-11-30 15:40:07
 */

import React, { Component } from "react";
import MineComponentList from "@/components/Question/mine-component-list";
import QuestionTab from "@/components/Question/question-tab";
import teacher from "@/assets/teacher.png";


export default class Mine extends Component {
  render() {
    return (
      <div className="mine">
        <div className="mine-box">
          <section className="mine-header">
            <div
              className="mine-header__avator"
              style={{
                background: "url(" + teacher + ")",
                backgroundSize: "100%"
              }}
            ></div>
            <div className="mine-header__name">小明</div>
          </section>
          <section className="mine-question">
            <h4 className="mine-question__title">已发布的问题</h4>
            <div className="mine-question__list">
              <MineComponentList />
            </div>
          </section>
        </div>
        <QuestionTab />
      </div>
    );
  }
}
