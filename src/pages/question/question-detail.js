/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-10 18:28:23
 */
// @flow
import React, { Component } from 'react';
import QuestionItem from '@/components/Question/question-item';
class QuestionDetail extends Component<{}, {}> {
  render() {
    console.log('QuestionDetail');
    return (
      <div className="question-detail">
        <QuestionItem />
      </div>
    );
  }
}

export default QuestionDetail;
