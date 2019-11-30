/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-30 16:18:23
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import teacher from "@/assets/teacher.png";

// 文字的最大长度
const maxLength = 35;

class ListItem extends Component {
  gotoDetail() {
    // x;
  }
  dealData(number) {
    number = +number;
    return number.toLocaleString();
  }
  elipsisText(text) {
    return text.substr(0, maxLength) + "...";
  }

  render() {
    const { collection_count, like_count, content } = this.props.data;

    return (
      <div className="list-item">
        <div className="list-item__advatorBox">
          <img className="list-item__advator" src={teacher} alt="用户头像" />
        </div>
        <div className="list-item__contentBox">
          <div
            className="list-item__content"
            onClick={() =>
              this.props.history.push({
                pathname: "/questiondetail",
                state: {
                  id: 3
                }
              })
            }
          >
            {content.length > maxLength ? this.elipsisText(content) : content}
            <span className="list-item__contentCheck">查看详情</span>
          </div>
          <div className="list-item__control">
            <div className="list-item__control--status">
              <span>{this.dealData(collection_count)}&nbsp;收藏</span>
              &nbsp;·&nbsp;
              <span>{this.dealData(like_count)}&nbsp;赞同</span>
            </div>
            <div className="list-item__control--btn">
              <span>[收藏]</span>
              &nbsp;&nbsp;
              <span>[赞同]</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ListItem);
