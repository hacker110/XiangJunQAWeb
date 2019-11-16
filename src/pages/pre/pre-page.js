/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-16 16:21:24
 */
// @flow
import React, { Component } from "react";
import TagList from "@/components/TagList.js";
import { TextareaItem, Button, Toast } from "antd-mobile";
import { trim } from "@/utils/utils.js";
import profession from "@/constant/profession.js";

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
  /**
   * @Description: 获取标签list
   */
  getTagList() {
    let tagList = profession.map(item => ({
      tagId: item.id,
      tagName: item.name
    }));
    setTimeout(() => {
      this.setState({
        tagList
      });
    }, 1000);
  }

  /**
   * @Description: 发布问题/分享
   */
  publish(e) {
    const { selectedTag, value } = this.state;
    if (!selectedTag.length) return Toast.info("请选择标签");
    if (trim(value) === "") return Toast.info("请输入内容");
    console.log("publish");
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
          >
            主页
          </Button>
          <Button
            onClick={this.publish.bind(this)}
            icon="check-circle-o"
            type="primary"
            inline
          >
            发布
          </Button>
        </div>
      </div>
    );
  }
}

export default PrePage;
