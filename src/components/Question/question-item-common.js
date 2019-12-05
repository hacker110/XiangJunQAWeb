/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-05 23:36:14
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import teacher from "@/assets/teacher.png";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

// 文字的最大长度
const maxLength = 35;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.collect = this.collect.bind(this);
    this.like = this.like.bind(this);
    this.openAnswer = this.openAnswer.bind(this);
    const { collection_count, like_count } = this.props.data;
    this.state = {
      like_count: like_count,
      collection_count: collection_count
    };
  }
  gotoDetail() {
    // x;
  }
  dealData(number) {
    number = +number;
    return number.toLocaleString();
  }
  elipsisText(text) {
    return text.substr(0, maxLength) + "...";
  }
  collect() {
    const { question_id, create_user_id } = this.props.data;
    post(QUESTION.SAVE_QUESTION_COLLECTION, {
      question_id: question_id,
      create_user_id: create_user_id,
      like_user_id: 1
    }).then(res => {
      this.setState(prev => ({ collection_count: prev.collection_count + 1 }));
      console.log("collect", res);
    });
  }
  like() {
    const { question_id, create_user_id } = this.props.data;
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: create_user_id,
      question_id: question_id,
      like_user_id: 1
    }).then(res => {
      this.setState(prev => ({ like_count: prev.like_count + 1 }));
      console.log("like", res);
    });
  }
  openAnswer() {
    const { question_id } = this.props.data;
    this.props.history.push({
      pathname: `/question/questionanswer/${question_id}`,
    });
  }
  render() {
    const { content, question_id } = this.props.data;
    const { collection_count, like_count } = this.state;

    return (
      <div className="list-item">
        <div className="list-item__advatorBox">
          <img className="list-item__advator" src={teacher} alt="用户头像" />
        </div>
        <div className="list-item__contentBox">
          <div
            className="list-item__content"
            onClick={() =>
              // ?id=" + question_id
              this.props.history.push({
                pathname: `/question/questiondetail/${question_id}`
              })
            }
          >
            {content.length > maxLength ? this.elipsisText(content) : content}
            <span className="lis/t-item__contentCheck">查看详情</span>
          </div>
          <div className="list-item__control">
            <div className="list-item__control--status">
              <span>{this.dealData(collection_count)}&nbsp;收藏</span>
              &nbsp;·&nbsp;
              <span>{this.dealData(like_count)}&nbsp;赞同</span>
            </div>
            <div className="list-item__control--btn">
              <span onClick={this.collect}>[关注]</span>
              &nbsp;&nbsp;
              <span onClick={this.like}>[点赞]</span>
              &nbsp;&nbsp;
              <span onClick={this.openAnswer}>[回答]</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ListItem);
