/*
 * @Description: 我的页面
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-11-13 08:30:07
 * @LastEditTime : 2019-12-25 22:38:32
 */

import React, { Component } from "react";
import QuestionTab from "@/components/Question/question-tab";
import { Tabs } from "antd-mobile";
import { QUESTION } from "@/service/api.js";
import List from "@/components/common-list/list.jsx";
import QuestionItem from "@/components/mine/question-item";
import ShareItem from "@/components/mine/share-item";
import CollectItem from "@/components/mine/collect-item";
import teacher from "@/assets/teacher.png";

const tabs = [
  { title: "问题", sub: "1" },
  { title: "分享", sub: "2" },
  { title: "收藏", sub: "3" }
];
const ListItem = {
  1: { url: QUESTION.GET_QUESTION_BY_UID, item: QuestionItem }, // 问题
  2: { url: QUESTION.GET_QUESTION_BY_UID, item: ShareItem }, // 分享
  3: { url: QUESTION.GET_COLLECTION_QUESTION, item: CollectItem } // 收藏
};

export default class Mine extends Component {
  constructor(props) {
    super(props);
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.state = {
      currentTab: "1",
      userInfo
    };
  }

  render() {
    const { currentTab, userInfo } = this.state;
    // question的类型
    let args = {};
    if (currentTab < 3) {
      args = { type: currentTab };
    }
    return (
      <div className="mine">
        <div className="mine-box">
          <section className="mine-header">
            <div className="mine-header__avator">
              <img src={userInfo.photo || teacher} alt="头像" />
            </div>
            <div className="mine-header__desc">
              <div className="mine-header__name">{userInfo.name}</div>
              <div className="mine-header__provence">
                {userInfo.provence || userInfo.city}
              </div>
            </div>
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
              <div style={{ height: "100%" }}>
                <List
                  key={currentTab}
                  searchArgvs={args}
                  label={"mine" + currentTab}
                  api={ListItem[currentTab].url}
                  item={ListItem[currentTab].item}
                />
              </div>
            </div>
          </section>
        </div>
        <QuestionTab />
      </div>
    );
  }
}
