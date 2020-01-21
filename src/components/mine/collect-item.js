/*
 * @Description: 收藏
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-01-21 20:58:17
 */
// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import teacher from "@/assets/teacher.png";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

// 文字的最大长度
const maxLength = 35;

function ListItem(props) {
  const { userInfo } = props;
  const { content, question_id, create_user_id } = props.data;

  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };
  const unCollect = () => {
    post(QUESTION.CANCLE_QUESTION_COLLECTION, {
      question_id: question_id,
      create_user_id: create_user_id,
      collection_user_id: userInfo.id
    }).then(res => {
      props.deleteItem({ question_id });
      window.location.reload();
    });
  };
  return (
    <div className="list-item">
      <div className="list-item__advatorBox">
        <img className="list-item__advator" src={teacher} alt="用户头像" />
      </div>
      <div className="list-item__contentBox">
        <div
          className="list-item__content"
          onClick={() =>
            // ?id=" + question_id
            props.history.push({
              pathname: `/question/questiondetail/${question_id}`
            })
          }
        >
          {content.length > maxLength ? elipsisText(content) : content}
          <span className="list-item__contentCheck">&nbsp;点击查看详情</span>
        </div>
        <div className="list-item__control">
          <div className="list-item__control--status"></div>
          <div className="list-item__control--btn">
            <i
              onClick={unCollect}
              className={"iconfont iconfavor-active selectIcon selectedIcon"}
              style={{ marginRight: "16px" }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ListItem);
