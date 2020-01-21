/*
 * @Description: 问题
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-01-21 20:52:10
 */
// @flow
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import teacher from "@/assets/teacher.png";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

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
    post(QUESTION.DELETE_QUESTION_BY_QUESTIONID, {
      user_id: userInfo.id,
      question_id: question_id
    }).then(res => {
      window.location.reload();
    });
  };

  const editQuestion = () => {
    props.history.push({
      pathname: `/question/questioncreate/question/${question_id}`
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
            {/*collectionStatus ? (
              <i
                onClick={unCollect}
                className={"iconfont iconfavor-active selectIcon selectedIcon"}
                style={{ marginRight: "16px" }}
              ></i>
            ) : (
              <i
                onClick={collect}
                className={
                  "iconfont iconfavor-active selectIcon unselectedIcon"
                }
                style={{ marginRight: "16px" }}
              ></i>
            )}
            {likeStatus ? (
              <i
                onClick={unLikeFun}
                className={"iconfont icondiancai1-copy selectIcon selectedIcon"}
                style={{ marginRight: "10px" }}
              ></i>
            ) : (
              <i
                onClick={likeFun}
                className={
                  "iconfont icondiancai1-copy selectIcon unselectedIcon"
                }
                style={{ marginRight: "10px" }}
              ></i>
            )*/}
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
