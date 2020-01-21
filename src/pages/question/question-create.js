/*
 * @Description: 提问
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-01-16 17:55:25
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
import { QUESTION, SUBJECT, FILE } from "@/service/api.js";
import { post } from "@/utils/request.js";
import { QESTION_TYPE } from "@/utils/constans.js";
const pageStatusConf = {
  CREATE: "create",
  EDIT: "edit"
};
class QuestionCreate extends Component {
  constructor(props) {
    super(props);
    console.log("QuestionCreate");
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const { questionId, type } = this.props.match.params;
    console.log(questionId);
    this.state = {
      id: questionId,
      questionType: questionId && [
        QESTION_TYPE.find(item => item.alias === type)["value"]
      ],
      pageStatus: questionId ? pageStatusConf.EDIT : pageStatusConf.CREATE,
      subject_id: [],
      files: [],
      content: "",
      choiceData: [],
      uploadFiles: [],
      userInfo
    };
    if (questionId) {
      this.getData();
    }
  }

  componentDidMount() {
    this.getAllSubject();
    this.autoFocusInst.focus();
  }

  onChange = (files, type, index) => {
    if (type === "add") {
      let cur = files.slice(-1);
      this.uploadFun(cur[0].file);
    }
    this.setState({
      files
    });
  };

  updateQuestion() {
    const {
      id,
      subject_id,
      content,
      uploadFiles,
      questionType,
      userInfo
    } = this.state;
    post(QUESTION.UPDATE_QUESTION, {
      id,
      uploadFiles,
      content,
      subject_id: subject_id[0],
      user_id: userInfo.id,
      type: questionType[0]
    }).then(res => {
      this.props.history.goBack();
      console.log(res.data);
    });
  }

  uploadFun(file) {
    const { uploadFiles } = this.state;
    let formdata = new FormData();
    formdata.append("file", file);
    post(FILE.SAVE_FILE, formdata, { needqs: false }).then(res => {
      uploadFiles.push(res.data);
      this.setState({
        uploadFiles
      });
      console.log(res.data);
    });
  }

  /**
   * @Description: 发布问题/分享
   */
  publish(e) {
    const {
      subject_id,
      content,
      uploadFiles,
      questionType,
      userInfo
    } = this.state;
    if (!subject_id) return Toast.info("请选择标签");
    if (trim(content) === "") return Toast.info("请输入内容");
    post(QUESTION.ADD_QUESTION, {
      subject_id: subject_id[0],
      content,
      type: questionType[0],
      user_id: userInfo.id,
      img_name: uploadFiles.join(",")
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

  // 获取问题详情
  getData() {
    const { id, userInfo } = this.state;
    console.log(id, userInfo);
    post(QUESTION.GET_QUESTION_BY_ID, {
      id: id,
      user_id: userInfo.id
    }).then(res => {
      const { content, CollectionCount, LikeCount, user_id, su_id } = res.data;
      this.setState({
        user_id,
        content,
        CollectionCount,
        LikeCount,
        subject_id: [su_id],
        icon: "https://avatars2.githubusercontent.com/u/25131706?s=40&v=4"
      });
    });
  }

  render() {
    const { files, content, choiceData, pageStatus } = this.state;
    return (
      <div className="question-create">
        <div className="question-create__box">
          <Picker
            data={QESTION_TYPE}
            title="选择类型"
            cols={1}
            value={this.state.questionType}
            onOk={v => this.setState({ questionType: v })}
          >
            <List.Item arrow="horizontal">选择创建的类型</List.Item>
          </Picker>
          <br />
          <Picker
            data={choiceData}
            title="选择专业"
            cols={1}
            value={this.state.subject_id}
            onChange={v => this.setState({ subject_id: v })}
            // onOk={v => this.setState({ subject_id: v })}
          >
            <List.Item arrow="horizontal">选择相关专业</List.Item>
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
            {pageStatus === pageStatusConf.CREATE ? (
              <Button
                onClick={this.publish.bind(this)}
                icon="check-circle-o"
                size="small"
                type="primary"
                inline
              >
                发布并返回主页
              </Button>
            ) : (
              <Button
                onClick={this.updateQuestion.bind(this)}
                icon="check-circle-o"
                size="small"
                type="primary"
                inline
              >
                保存并返回主页
              </Button>
            )}
          </div>
        </div>

        <QuestionTab />
      </div>
    );
  }
}

export default withRouter(QuestionCreate);
