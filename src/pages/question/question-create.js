/*
 * @Description: 提问
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-11 22:11:02
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import QuestionTab from "@/components/Question/question-tab";

import {
  Picker,
  List,
  TextareaItem,
  ImagePicker,
  Button,
  Toast
} from "antd-mobile";
import { trim } from "@/utils/utils.js";
import { post } from "@/utils/request.js";
import { SUBJECT, QUESTION } from "@/service/api.js";

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
    this.state = {
      subject_id: [],
      files: data,
      content: "",
      choiceData: []
    };
  }

  componentWillMount() {
    this.getAllSubject();
  }
  componentDidMount() {
    this.autoFocusInst.focus();
  }

  gotoDetail() {
    // x;
  }
  onChange = (files, type, index) => {
    console.log("onChange");
    console.log(files, type, index);
    this.setState({
      files
    });
  };
  onAddImageClick = e => {
    console.log("onAddImageClick");
    e.preventDefault();
    this.setState({
      files: this.state.files.concat({
        url: "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg",
        id: "3"
      })
    });
  };
  /**
   * @Description: 发布问题/分享
   */
  publish(e) {
    const { subject_id, content } = this.state;
    if (!subject_id) return Toast.info("请选择标签");
    if (trim(content) === "") return Toast.info("请输入内容");
    post(QUESTION.ADD_QUESTION, {
      subject_id: subject_id[0],
      content,
      type: 1,
      user_id: 1
    }).then(e => {
      if (e.status === 200) {
        this.props.history.push("/question/questionlist");
      }
    });
  }

  getAllSubject() {
    post(SUBJECT.GET_ALL_SUBJECT, { currentPage: 1, pageSize: 100 }).then(e => {
      const list = e.data.rows;
      this.setState({
        choiceData: list.map(item => ({ label: item.title, value: item.id }))
      });
    });
  }

  render() {
    const { files, content, choiceData } = this.state;
    return (
      <div className="question-create">
        <div className="question-create__box">
          <Picker
            data={choiceData}
            title="选择专业"
            cols={1}
            value={this.state.subject_id}
            onChange={v => this.setState({ subject_id: v })}
            // onOk={v => this.setState({ subject_id: v })}
          >
            <List.Item arrow="horizontal">选择专业</List.Item>
          </Picker>
          <br />
          <TextareaItem
            placeholder="请输入您的问题或者想法"
            rows={5}
            count={100}
            value={content}
            ref={ref => (this.autoFocusInst = ref)}
            onChange={content => this.setState({ content })}
          />
          <ImagePicker
            className="img-picker"
            files={files}
            onChange={this.onChange}
            onAddImageClick={this.onAddImageClick}
            multiple={true}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 8}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
          <div className="question-create__btns">
            <Button
              onClick={() => {
                this.props.history.push({
                  pathname: "/question/questionlist"
                });
              }}
              size="small"
              inline
              type="primary"
              icon="check-circle-o"
            >
              返回主页
            </Button>
            <Button
              onClick={this.publish.bind(this)}
              icon="check-circle-o"
              size="small"
              type="primary"
              inline
            >
              发布并返回主页
            </Button>
          </div>
        </div>

        <QuestionTab />
      </div>
    );
  }
}

export default withRouter(QuestionCreate);
