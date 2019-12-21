/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2019-12-21 22:11:11
 */
// @flow
import React, { Component } from "react";
import { Tabs } from "antd-mobile";
import QuestionTab from "@/components/Question/question-tab";
import { QUESTION, USER } from "@/service/api.js";
import List from "@/components/common-list/list.jsx";
import { post } from "@/utils/request.js";
import QuestionItem from "@/components/Question/list/question-item";

const tabs1 = [
  { title: "推荐", sub: "1" },
  { title: "最新", sub: "2" },
  { title: "关注", sub: "3" }
];
const tabs2 = [
  { title: "工商管理", sub: "1" },
  { title: "体育", sub: "2" },
  { title: "人力资源", sub: "3" },
  { title: "美术", sub: "4" },
  { title: "美术", sub: "5" },
  { title: "美术", sub: "6" },
  { title: "音乐", sub: "7" }
];

class QuestionList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
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
    const { userInfo } = this.state;
    return (
      <div className="question-list">
        <Tabs
          tabs={tabs1}
          initialPage="1"
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
        >
          <Tabs
            // key={item.sub}
            tabs={tabs2}
            initialPage="1"
            onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
            }}
          ></Tabs>
        </Tabs>
        <div className="question-listbox">
          {userInfo.id && (
            <List
              label="list"
              api={QUESTION.GET_NEW_QUESTION}
              item={QuestionItem}
              perpagenum={10}
              renderFooterPadding="10px 0 50px"
              subjectId={0}
            />
          )}
        </div>
        <QuestionTab />
      </div>
    );
  }
}

export default QuestionList;
