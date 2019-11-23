/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-23 16:13:33
 */
// @flow
import React, { Component } from "react";
import { Tabs } from "antd-mobile";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

import ComponentList from "@/components/Question/component-list";
import QuestionTab from "@/components/Question/question-tab";

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
    this.state = { data: [] };
    this.getData();
  }

  getData() {
    post(QUESTION.GET_NEW_QUESTION, { currentPage: 1, pageSize: 30 }).then(
      e => {
        console.log(e.data.rows);
        this.setState(
          {
            data: e.data.rows
          },
          () => {}
        );
      }
    );
  }

  render() {
    console.log("QuestionList");
    // <Tabs
    //   tabs={tabs1}
    //   initialPage="1"
    //   onChange={(tab, index) => {
    //     console.log("onChange", index, tab);
    //   }}
    //   onTabClick={(tab, index) => {
    //     console.log("onTabClick", index, tab);
    //   }}
    // >
    //   {tabs1.map(item => {
    //     return (
    //       <Tabs
    //         key={item.sub}
    //         tabs={tabs2}
    //         initialPage="1"
    //         onChange={(tab, index) => {
    //           console.log("onChange", index, tab);
    //         }}
    //         onTabClick={(tab, index) => {
    //           console.log("onTabClick", index, tab);
    //         }}
    //       >
    //         {tabs2.map(childItem => {
    //           return (
    //             <ComponentList
    //               style={{
    //                 height: "100%",
    //                 backgroundColor: "#fff"
    //               }}
    //               key={item.sub + "-" + childItem.sub}
    //               tabIndex={item.sub}
    //               subTabIndex={childItem.sub}
    //               data={this.state.data}
    //             />
    //           );
    //         })}
    //       </Tabs>
    //     );
    //   })}
    // </Tabs>
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
        <ComponentList
          style={{
            height: "100%",
            backgroundColor: "#fff"
          }}
          // key={item.sub}
          // tabIndex={item.sub}
          data={this.state.data}
        />
        <QuestionTab />
      </div>
    );
  }
}

export default QuestionList;
