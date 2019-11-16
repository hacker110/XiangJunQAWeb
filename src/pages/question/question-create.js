/*
 * @Description: 提问
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-13 09:18:00
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Picker, List, TextareaItem } from "antd-mobile";
const seasons = [[
  {
    label: "工商管理",
    value: 1
  },
  {
    label: "计算机",
    value: 2
  }
]];

class QuestionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { sValue: [1] };
  }
  gotoDetail() {
    // x;
  }

  render() {
    return (
      <div className="question-create">
        <Picker
          data={seasons}
          title="选择季节"
          cascade={false}
          cols={1}
          value={this.state.sValue}
          onChange={v => this.setState({ sValue: v })}
          onOk={v => this.setState({ sValue: v })}
        >
          <List.Item arrow="horizontal">选择专业</List.Item>
        </Picker>
        <br />
        <TextareaItem
          rows={5}
          count={100}
        />
      </div>
    );
  }
}

export default withRouter(QuestionCreate);
