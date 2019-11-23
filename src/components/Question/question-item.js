/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-23 13:51:31
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ListItem extends Component {
  gotoDetail() {
    // x;
  }

  render() {
    const {
      subject_id,
      collection_count,
      like_count,
      subject_title,
      content
    } = this.props.data;

    return (
      <div
        onClick={() =>
          this.props.history.push({
            pathname: "/questiondetail",
            state: {
              id: 3
            }
          })
        }
        className="list-item"
      >
        <div>{subject_id}</div>
        <div>{collection_count}</div>
        <div>{like_count}</div>
        <div>{subject_title}</div>
        <div>{content}</div>
      </div>
    );
  }
}

export default withRouter(ListItem);
