/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-01 09:16:59
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
      data: {
        id: 123,
        title: "最近周杰伦的新歌,有一段旋律比较轻快,但是降一个C调会不会更改呢?",
        icon: "https://avatars2.githubusercontent.com/u/25131706?s=40&v=4"
      }
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    post(QUESTION.GET_QUESTION_BY_ID, {
      id: this.state.id
    }).then(res => {
      this.setState({
        data: res
      });
    });
  }

  render() {
    const { id, title, icon } = this.state.data;
    return (
      <div data-question={id} className="question-item">
        <img src={icon} alt="用户的icon" />
        <div>{title}</div>
      </div>
    );
  }
}

export default withRouter(QuestionItem);
