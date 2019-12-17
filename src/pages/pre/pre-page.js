/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-17 23:37:16
 */
// @flow
import React, { Component } from "react";
import TagList from "@/components/TagList.js";
import { TextareaItem, Button, Toast } from "antd-mobile";
import { trim } from "@/utils/utils.js";
// import profession from "@/constant/profession.js";
import { post } from "@/utils/request.js";
import { QUESTION, SUBJECT, USER } from "@/service/api.js";
import { QESTION_TYPE } from "@/utils/constans.js";

class PrePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTag: [],
      tagList: [],
      value: ""
    };
    this.getTagList();
    this.handleChange = this.handleChange.bind(this);
    this.selectedTag = this.selectedTag.bind(this);
  }

  componentDidMount() {
    this.autoFocusInst.focus();
  }
  /**
   * @Description: 发布问题
   */
  saveData() {
    Promise.all([this.saveSubject(), this.addShare()]).then(res => {
      console.log(res);
      this.props.history.push("/question/questionlist");
    });
  }

  /**
   * @Description: 保存类目
   */

  saveSubject() {
    return new Promise((resolve, reject) => {
      const { selectedTag } = this.state;
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      post(USER.USER_BIND_SUBJECT, {
        subjectIds: selectedTag.join(","),
        user_id: userInfo.id
      }).then(e => {
        if (e.status === 200) {
          resolve();
          Toast.success("发布成功~");
        }
      });
    });
  }
  /**
   * @Description: 分享
   */

  addShare() {
    return new Promise((resolve, reject) => {
      const { value, selectedTag } = this.state;
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      post(QUESTION.ADD_QUESTION, {
        content: value,
        type: QESTION_TYPE.SHARE,
        user_id: userInfo.id,
        subject_id: selectedTag[0]
      }).then(e => {
        if (e.status === 200) {
          resolve();
          Toast.success("发布成功~");
        }
      });
    });
  }
  /**
   * @Description: 获取标签list
   */
  getTagList() {
    post(SUBJECT.GET_ALL_SUBJECT, {
      currentPage: 1,
      pageSize: 30
    }).then(res => {
      let tagList = res.data.rows.map(item => ({
        tagId: item.id,
        tagName: item.title
      }));
      this.setState({
        tagList
      });
    });
  }

  /**
   * @Description: 发布问题/分享
   */
  publish(e) {
    const { selectedTag, value } = this.state;
    if (!selectedTag.length) return Toast.info("请选择标签", 2, null, false);
    if (trim(value) === "") return Toast.info("请输入内容", 2, null, false);
    console.log("publish");
    this.saveData();
  }

  /**
   * @Description: 设置选择标签
   */
  selectedTag(selectedTag) {
    this.setState({
      selectedTag
    });
  }
  /**
   * @Description: 设置输入内容
   */
  handleChange(value) {
    this.setState({
      value
    });
  }

  render() {
    return (
      <div className="prev">
        <h4 className="prev-title">
          请选择自己的专业或喜好的专业,并提出问题,可以多选.
        </h4>
        <TagList selectedTag={this.selectedTag} tagList={this.state.tagList} />
        <TextareaItem
          ref={ref => (this.autoFocusInst = ref)}
          className="prev-text"
          placeholder="请输入您的问题或者想法"
          rows={7}
          count={200}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div className="prev-btnGroups">
          <Button
            onClick={() => {
              this.props.history.push({
                pathname: "/question/questionlist"
              });
            }}
            inline
            type="primary"
            icon="check-circle-o"
            size="small"
          >
            主页
          </Button>
          <Button
            onClick={this.publish.bind(this)}
            icon="check-circle-o"
            type="primary"
            inline
            size="small"
          >
            发布
          </Button>
        </div>
      </div>
    );
  }
}

export default PrePage;
