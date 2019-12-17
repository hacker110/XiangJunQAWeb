/*
 * @Description: 问题详情
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-17 23:24:30
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

class QuestionItem extends Component<{}, {}> {
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
    this.collect = this.collect.bind(this);
    this.like = this.like.bind(this);
  }

  componentWillMount() {
    this.getData();
  }
  collect() {
    const { id, user_id } = this.state;
    post(QUESTION.SAVE_QUESTION_COLLECTION, {
      question_id: id,
      create_user_id: user_id,
      like_user_id: 1
    }).then(res => {
      this.setState(prev => ({ CollectionCount: prev.CollectionCount + 1 }));
    });
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
    post(QUESTION.GET_QUESTION_BY_ID, {
      id: this.state.id
    }).then(res => {
      const { content, CollectionCount, LikeCount, user_id } = res.data;
      this.setState({
        user_id,
        content,
        CollectionCount,
        LikeCount,
        icon: "https://avatars2.githubusercontent.com/u/25131706?s=40&v=4"
      });
    });
  }

  dealData(number) {
    number = +number;
    return number.toLocaleString();
  }

  render() {
    const { id, content, icon, CollectionCount, LikeCount } = this.state;
    return (
      <div data-question={id} className="question-itemDetail">
        <div className="question-itemDetail-box">
          <div className="question-itemDetail-imgBox">
            <img src={icon} alt="用户的icon" />
          </div>
          <div className="question-itemDetail-txtBox">{content}</div>
        </div>
        <div className="question-itemDetail-bottom">
          <div className="question-itemDetail-status">
            <div className="list-item__control--status">
              <span>{this.dealData(CollectionCount)}&nbsp;收藏</span>
              &nbsp;·&nbsp;
              <span>{this.dealData(LikeCount)}&nbsp;赞同</span>
            </div>
          </div>
          <div className="question-itemDetail-tools">
            <span
              className="question-itemDetailBtns"
              onClick={this.collect}
              style={{ marginRight: "4px" }}
            >
              关注
            </span>
            <span
              className="question-itemDetailBtns"
              onClick={this.like}
              style={{ marginRight: "4px" }}
            >
              点赞
            </span>
            <span
              className="question-itemDetailBtns"
              onClick={() => {
                this.props.history.push({
                  pathname: `/question/questionanswer/${id}`
                });
              }}
              style={{ marginRight: "4px" }}
            >
              回答
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuestionItem);
