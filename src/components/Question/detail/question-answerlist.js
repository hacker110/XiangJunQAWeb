/*
 * @Description: 问题详情-答案列表
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-17 23:12:39
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";
import List from "@/components/common-list/list.jsx";
import AnswerItem from "./answer-item.jsx";

class QuestionAnswerList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      id,
      CollectionCount: 0,
      LikeCount: "",
      content: "",
      icon: "",
      user_id: 0,
      data: []
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {}

  getData(pageIndex) {
    return new Promise((resolve, reject) => {
      post(QUESTION.GET_QUESTION_ANSWER_BY_QUESTIONID, {
        question_id: this.state.id,
        currentPage: pageIndex || 1,
        pageSize: 6
      }).then(res => {
        this.setState({ data: res.data.rows });
        resolve(res.data.rows);
      });
    });
  }

  render() {
    const { id } = this.state;
    return (
      <div data-question={id} className="question-answerlist">
        <List
          label="detail"
          api={QUESTION.GET_QUESTION_ANSWER_BY_QUESTIONID}
          searchArgvs={{ question_id: id }}
          item={AnswerItem}
        />
      </div>
    );
  }
}

export default withRouter(QuestionAnswerList);
