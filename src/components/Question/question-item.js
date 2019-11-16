/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-13 08:26:20
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ListItem extends Component {
  gotoDetail() {
    // x;
  }

  render() {
    const { id, title } = this.props.data;
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
        <div>{id}</div>
        <div>{title}</div>
      </div>
    );
  }
}

export default withRouter(ListItem);
