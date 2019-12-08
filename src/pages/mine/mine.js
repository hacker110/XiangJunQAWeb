/*
 * @Description: 我的页面
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-13 08:30:07
 * @LastEditTime: 2019-12-11 21:59:51
 */

import React, { Component } from "react";
import QuestionTab from "@/components/Question/question-tab";
import { Tabs } from "antd-mobile";
import { QUESTION } from "@/service/api.js";
import List from "@/components/common-list/list.jsx";
import QuestionItem from "@/components/Question/list/question-item";
import teacher from "@/assets/teacher.png";

const tabs = [
  { title: "问题", sub: "1" },
  { title: "分享", sub: "2" },
  { title: "收藏", sub: "3" }
];
const UrlList = {
  1: QUESTION.GET_QUESTION_BY_UID, // 问题
  2: QUESTION.GET_QUESTION_BY_UID, // 分享
  3: QUESTION.GET_COLLECTION_QUESTION // 收藏
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
    //  <MineComponentList key={currentTab} cate={currentTab} />;

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
                  label={"mine" + currentTab}
                  api={UrlList[currentTab]}
                  item={QuestionItem}
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
