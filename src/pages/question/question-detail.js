/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-05 23:02:47
 */
// @flow
import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import Question from "@/components/Question/question-detail";
import QuestionAnswerlist from "@/components/Question/question-answerlist";
class QuestionDetail extends Component<{}, {}> {
  render() {
    console.log("QuestionDetail");
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          // rightContent={[
          //   <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
          //   <Icon key="1" type="ellipsis" />
          // ]}
        >
          问题详情
        </NavBar>
        <Question className="question-detail" />
        <QuestionAnswerlist />
      </div>
    );
  }
}

export default QuestionDetail;