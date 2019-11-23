/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-23 12:40:34
 */
// @flow
import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";

class QuestionBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.match.path,
      hidden: false,
      tabs: [
        {
          key: "主页",
          title: "主页",
          icon:
            "https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
          selectedIcon:
            "https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
          selected: "/question/questionlist",
          path: "/question/questionlist"
        },
        {
          key: "我的",
          title: "我的",
          icon:
            "https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg",
          selectedIcon:
            "https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg",
          selected: "/question/mine",
          path: "/question/mine"
        },
        {
          key: "提问",
          title: "提问",
          icon:
            "https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg",
          selectedIcon:
            "https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg",
          selected: "/question/questioncreate",
          path: "/question/questioncreate"
        }
      ]
    };
  }

  render() {

    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "0.5rem",
          bottom: 0
        }}
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          {this.state.tabs.map(item => {
            return (
              <TabBar.Item
                title={item.title}
                key={item.key}
                icon={
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      background:
                        "url(" +
                        item.icon +
                        ") center center /  21px 21px no-repeat"
                    }}
                  />
                }
                selectedIcon={
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      background:
                        "url(" +
                        item.selectedIcon +
                        ") center center /  21px 21px no-repeat"
                    }}
                  />
                }
                selected={this.state.selectedTab === item.path}
                // badge={1}
                onPress={() => {
                  console.log(this.state.selectedTab, item.path);
                  this.setState(
                    {
                      selectedTab: item.path
                    },
                    () => {
                      console.log(this.state.selectedTab, item.path);
                      this.props.history.push(item.path);
                    }
                  );
                }}
                data-seed="logId"
              ></TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}

export default withRouter(QuestionBase);
