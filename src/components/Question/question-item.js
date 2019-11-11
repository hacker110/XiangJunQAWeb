/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-10 18:24:28
 */
// @flow
import React, { Component } from 'react';

class QuestionItem extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 123,
        title: '最近周杰伦的新歌,有一段旋律比较轻快,但是降一个C调会不会更改呢?',
        icon: 'https://avatars2.githubusercontent.com/u/25131706?s=40&v=4'
      }
    };
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

export default QuestionItem;
