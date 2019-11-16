/*
 * @Description: 提问
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-16 16:41:20
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Picker, List, TextareaItem, ImagePicker } from "antd-mobile";
import professionData from "@/constant/profession.js";

const choiceData = [
  professionData.map(item => ({ label: item.name, value: item.id }))
];

const data = [
  {
    url: "https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg",
    id: "2121"
  },
  {
    url: "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg",
    id: "2122"
  }
];
class QuestionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { profession: [], files: data };
  }
  gotoDetail() {
    // x;
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files
    });
  };
  onAddImageClick = e => {
    e.preventDefault();
    this.setState({
      files: this.state.files.concat({
        url: "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg",
        id: "3"
      })
    });
  };

  render() {
    const { files } = this.state;
    return (
      <div className="question-create">
        <Picker
          data={choiceData}
          title="选择专业"
          cascade={false}
          cols={1}
          value={this.state.profession}
          onChange={v => this.setState({ profession: v })}
          onOk={v => this.setState({ profession: v })}
        >
          <List.Item arrow="horizontal">选择专业</List.Item>
        </Picker>
        <br />
        <TextareaItem
          placeholder="请输入您的问题或者想法"
          rows={5}
          count={100}
        />
        <ImagePicker
          length="6"
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 7}
          onAddImageClick={this.onAddImageClick}
          disableDelete
        />
      </div>
    );
  }
}

export default withRouter(QuestionCreate);
