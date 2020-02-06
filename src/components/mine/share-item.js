/*
 * @Description: 知识,分享
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-02-05 16:38:06
 */
// @flow
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd-mobile";
import teacher from "@/assets/teacher.png";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

const alert = Modal.alert;

// 文字的最大长度
const maxLength = 35;

function ListItem(props) {
  const { userInfo } = props;
  const { collection_count, like_count, content, question_id } = props.data;
  const [like] = useState(like_count);
  const [collection] = useState(collection_count);

  const dealData = number => {
    number = +number;
    return number.toLocaleString();
  };
  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };

  const deleteQuestion = () => {
    alert("删除", "确认删除该项吗?", [
      {
        text: "取消",
        onPress: () => {
          console.log("取消");
        }
      },
      {
        text: "确认",
        onPress: () => {
          post(QUESTION.DELETE_QUESTION_BY_QUESTIONID, {
            user_id: userInfo.id,
            question_id: question_id
          }).then(res => {
            window.location.reload();
          });
        }
      }
    ]);
  };

  const editQuestion = () => {
    props.history.push({
      pathname: `/question/questioncreate/knowledge/${question_id}`
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
          <div className="list-item__control--status">
            <span>{dealData(collection)}&nbsp;收藏</span>
            &nbsp;·&nbsp;
            <span>{dealData(like)}&nbsp;赞同</span>
          </div>
          <div className="list-item__control--btn">
            <i
              className={"iconfont iconshanchu selectIcon alertIcon"}
              onClick={deleteQuestion}
              style={{ marginRight: "16px" }}
            ></i>
            <i
              className={"iconfont iconbianji selectIcon selectedIcon"}
              onClick={editQuestion}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ListItem);