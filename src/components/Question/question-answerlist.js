/*
 * @Description: 问题详情-答案列表
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-05 23:14:21
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

class QuestionAnswerList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    console.log(id);
    this.state = {
      id,
      CollectionCount: 0,
      LikeCount: "",
      content: "",
      icon: "",
      user_id: 0
    };
  }

  componentWillMount() {
    this.getData();
  }

  like() {
    const { id, user_id } = this.state;
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: user_id,
      question_id: id,
      like_user_id: 1
    }).then(res => {
      this.setState(prev => ({ LikeCount: prev.LikeCount + 1 }));
      // this.setState(prev => ({ like_count: prev.like_count + 1 }));
      console.log("like", res);
    });
  }

  getData() {
    post(QUESTION.GET_QUESTION_ANSWER_BY_QUESTIONID, {
      question_id: this.state.id,
      currentPage: 1,
      pageSize: 30
    }).then(res => {
      console.log("answer", res);
    });
  }

  dealData(number) {
    number = +number;
    return number.toLocaleString();
  }

  render() {
    const { id, content, icon, CollectionCount, LikeCount } = this.state;
    return (
      <div data-question={id} className="question-answerlist">
        <div className="question-answerlist-box">
          <div className="question-answerlist-imgBox">
            <img src={icon} alt="用户的icon" />
          </div>
          <div className="question-answerlist-txtBox">{content}</div>
        </div>
        <div className="question-answerlist-bottom">
          <div className="question-answerlist-status">
            <div className="list-item__control--status">
              <span>{this.dealData(CollectionCount)}&nbsp;收藏</span>
              &nbsp;·&nbsp;
              <span>{this.dealData(LikeCount)}&nbsp;赞同</span>
            </div>
          </div>
          <div className="question-answerlist-tools">
            <span onClick={this.collect}>[收藏]</span>
            &nbsp;&nbsp;
            <span onClick={this.like}>[赞同]</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuestionAnswerList);
