/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-01-07 16:44:44
 */
// @flow
import React, { Component } from "react";
import { Tabs } from "antd-mobile";
import QuestionTab from "@/components/Question/question-tab";
import { QUESTION, USER } from "@/service/api.js";
import List from "@/components/common-list/list.jsx";
import { post } from "@/utils/request.js";
import QuestionItem from "@/components/Question/list/question-item";

const tabList = [
  {
    title: "推荐",
    key: 1,
    api: QUESTION.GET_NEW_QUESTION,
    item: QuestionItem,
    searchArgvs: { subjectId: 0 }
  },
  {
    title: "最新",
    key: 2,
    api: QUESTION.GET_NEW_QUESTION,
    item: QuestionItem,
    searchArgvs: { subjectId: 0 }
  },
  {
    title: "关注",
    key: 3,
    api: QUESTION.GET_COLLECTION_QUESTION_BY_UID,
    item: QuestionItem,
    searchArgvs: {}
  }
];
// const tabs2 = [
//   { title: "工商管理", key: 1" ,
//   { title: "体育", key: 2" ,
//   { title: "人力资源", key: 3" ,
//   { title: "美术", key: 4" ,
//   { title: "美术", key: 5" ,
//   { title: "美术", key: 6" ,
//   { title: "音乐", key: 7",
// ];

class QuestionList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: tabList[0],
      data: [],
      userInfo: {
        id: "",
        city: "",
        provence: "",
        photo: "",
        name: ""
      }
    };
  }

  componentDidMount() {
    const search = this.dealData(window.location.search);
    console.log(search);
    let wx_open_id = search["wx_open_id"];
    if (wx_open_id) localStorage.setItem("wx_open_id", wx_open_id);
    this.getUserInfo();
  }

  dealData(str) {
    let res = {};
    let arr = str.substr(1).split("&");
    arr.forEach(item => {
      let t = item.split("=");
      res[t[0]] = t[1];
    });
    return res;
  }

  getUserInfo() {
    const wx_open_id = localStorage.getItem("wx_open_id");
    post(USER.GET_USER_BY_OPENID, {
      wx_open_id
    }).then(res => {
      if (!res.data) return;
      const { id, city, provence, nick_name, head_img } = res.data;
      let userInfo = {
        id,
        city,
        provence,
        photo: head_img,
        name: nick_name
      };
      this.setState({ userInfo });
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    });
  }
  render() {
    const { userInfo, currentTab } = this.state;
    return (
      <div className="question-list">
        <Tabs
          tabs={tabList}
          initialPage="1"
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
            this.setState({ currentTab: tab });
          }}
        >
          {/*<Tabs
            // key={item.key}
           tabs={tabs,
            initialPage="1"
            onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
            }}
          ></Tabs>*/}
        </Tabs>
        <div className="question-listbox">
          {userInfo.id && (
            <List
              key={currentTab.key}
              label="list"
              api={currentTab.api}
              item={currentTab.item}
              perpagenum={10}
              renderFooterPadding="10px 0 50px"
              searchArgvs={Object.assign(currentTab.searchArgvs, {
                // user_id: userInfo.id
              })}
            />
          )}
        </div>
        <QuestionTab />
      </div>
    );
  }
}

export default QuestionList;
