/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-01-10 14:52:45
 */
// @flow
import React, { Component } from "react";
import { Button, TextareaItem, NavBar, Icon } from "antd-mobile";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

class QuestionAnwer extends Component<{}, {}> {
  constructor(props) {
    super(props);
    const { questionId, answerId } = this.props.match.params;
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.state = {
      userInfo,
      questionId,
      answerId,
      content: ""
    };
  }
  componentDidMount() {
    this.autoFocusInst.focus();
  }

  publish() {
    const { questionId, content, userInfo, answerId } = this.state;
    post(QUESTION.SAVE_QUESTION_ANSWER, {
      father_id: answerId || 0, // 0 问题的答案，>0 对答案的评论
      question_id: questionId,
      user_id: userInfo.id,
      content
    }).then(res => {
      console.log("QuestionAnwer", res);
      this.props.history.goBack();
    });
  }

  render() {
    const { answerId } = this.state;

    return (
      <div className="question-answer">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {answerId ? "回答评论" : "回答问题"}
        </NavBar>
        <TextareaItem
          className="question-anwer_text"
          placeholder="请输入您表达的内容~"
          rows={10}
          count={200}
          value={this.state.content}
          ref={el => (this.autoFocusInst = el)}
          onChange={content =>
            this.setState({
              content
            })
          }
        />
        <div className="question-answer_btnGroups">
          <Button
            onClick={this.publish.bind(this)}
            icon="check-circle-o"
            type="primary"
            inline
            size="small"
          >
            发布
          </Button>
        </div>
      </div>
    );
  }
}

export default QuestionAnwer;
