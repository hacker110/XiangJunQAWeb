/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-16 16:22:09
 */
// @flow
import React, { Component } from "react";
import { Tag } from "antd-mobile";
class TagList extends Component<{}, {}> {
  constructor(props) {
    super(props);
    console.log(props.tagList);
    this.state = {
      selected: []
    };
  }
  onChange(tagId) {
    const { selected } = this.state;
    let index = selected.indexOf(tagId);
    index > -1 ? selected.splice(index, 1) : selected.push(tagId);

    this.setState({
      selected
    });
    
    this.props.selectedTag(selected);
  }
  render() {
    return (
      <div className="tagList">
        {this.props.tagList.map((item,index) => {
          return (
            <Tag
              className="tagList-item"
              key={index}
              onChange={() => this.onChange(item.tagId)}
            >
              {item.tagName}
            </Tag>
          );
        })}
      </div>
    );
  }
}

export default TagList;
