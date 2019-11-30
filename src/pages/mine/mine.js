/*
 * @Description: 我的页面
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-13 08:30:07
 * @LastEditTime: 2019-11-30 17:07:30
 */

import React, { Component } from "react";
import MineComponentList from "@/components/Question/mine-component-list";
import QuestionTab from "@/components/Question/question-tab";
import teacher from "@/assets/teacher.png";
import { Tabs } from "antd-mobile";
const tabs = [
  { title: "问题", sub: "1" },
  { title: "分享", sub: "2" },
  { title: "收藏", sub: "3" }
];

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "1"
    };
  }
  render() {
    const { currentTab } = this.state;
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
            <Tabs
              tabs={tabs}
              initialPage={currentTab}
              onChange={(tab, index) => {
                this.setState({ currentTab: index + 1 });
              }}
            ></Tabs>
            <div className="mine-question__list">
              <MineComponentList key={currentTab} cate={currentTab} />
            </div>
          </section>
        </div>
        <QuestionTab />
      </div>
    );
  }
}
