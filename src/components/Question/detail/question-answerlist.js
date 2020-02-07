/*
 * @Description: 问题详情-答案列表
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-02-06 23:30:22
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { QUESTION } from "@/service/api.js";
import List from "@/components/common-list/list.jsx";
import AnswerItem from "./answer-item.jsx";

class QuestionAnswerList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    const { questionId } = this.props.match.params;
    this.state = {
      questionId,
      CollectionCount: 0,
      LikeCount: "",
      content: "",
      icon: "",
      user_id: 0,
      data: []
    };
  }

  componentDidMount() {}

  render() {
    const { questionId } = this.state;
    return (
      <div data-question={questionId} className="question-answerlist">
        <List
          label="detail"
          api={QUESTION.GET_QUESTION_ANSWER_BY_QUESTIONID}
          searchArgvs={{ question_id: questionId }}
          item={AnswerItem}
        />
      </div>
    );
  }
}

export default withRouter(QuestionAnswerList);
