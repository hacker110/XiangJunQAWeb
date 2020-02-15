/*
 * @Description: 问题的答案
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-12-12 00:33:44
 * @LastEditTime: 2020-02-08 09:44:48
 */
import React from "react";
import { withRouter } from "react-router-dom";
import { Icon, Toast } from "antd-mobile";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";
import { useState } from "react";
import Child from "./answer-child.jsx";

function AnswerItem(props) {
  // 文字的最大长度
  const maxLength = 35;
  console.log(props.data);
  const {
    content,
    question_id,
    create_user_id,
    answer_id,
    is_like,
    child,
    head_img
  } = props.data;
  const { userInfo } = props;
  // 子评论大于2的话标识可以加载更多
  const collapseFlag = child && child.length > 2;
  const [likeStatus, setLikeStatus] = useState(Boolean(is_like));
  const [hasMore, setHasMore] = useState(Boolean(collapseFlag));
  // const [collection, setCollection] = useState(collection_count);
  // const [collectionStatus, setCollectionStatus] = useState(collection_status);

  // 展开与合并的开关
  const [flag, setFlag] = useState(false);

  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };

  const likeFun = () => {
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: create_user_id,
      question_id: question_id,
      like_user_id: userInfo.id,
      question_answer_id: answer_id //0 对问题点赞，评论点赞,（评论的ID）
    }).then(res => {
      setLikeStatus(true);
      Toast.info('回答者收到了您的认可～');
      console.log("like", res);
    });
  };

  const unLikeFun = () => {
    post(QUESTION.CANCLE_QUESTION_LIKES, {
      like_user_id: userInfo.id,
      question_id: question_id,
      question_answer_id: answer_id //0 对问题点赞，评论点赞,（评论的ID）
    }).then(res => {
      setLikeStatus(false);
      Toast.info('您收回了对回答者的认可～');
      console.log("like", res);
    });
  };

  const openAnswer = () => {
    props.history.push({
      pathname: `/question/questionanswer/${question_id}/${answer_id}`
    });
  };
  const hasChild = () => {
    return child && child.length > 0;
  };
  console.log(child);
  return (
    <div className="list-item answer-item">
      <div className="list-item__advatorBox">
        <img className="list-item__advator" src={head_img} alt="用户头像" />
      </div>
      <div className="list-item__contentBox">
        <div className="list-item__content" style={{ maxHeight: "none" }}>
          {/* 开关打开状态或者内容长度小于最大长度时内容展示 */}
          {flag || content.length <= maxLength ? content : elipsisText(content)}
          {content.length > maxLength && (
            <span
              onClick={() => {
                setFlag(!flag);
              }}
              className="list-item__contentCheck"
            >
              {flag ? <Icon type="up" /> : <Icon type="down" />}
            </span>
          )}
        </div>
        <div className={`list-item__control ${hasChild() ? "hasline" : ""} `}>
          <div className="list-item__control--status"></div>
          <div className="list-item__control--btn">
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
            )}
            <i
              className={"iconfont iconicon-test-copy selectIcon"}
              onClick={openAnswer}
              style={{ marginRight: "4px", color: "#38bc6d" }}
            ></i>
          </div>
        </div>
        {hasChild() && (
          <div
            className="remark-list"
            style={{ maxHeight: hasMore ? "200px" : "1000px" }}
          >
            <Child data={child} userInfo={userInfo} hasMore={hasMore} />
          </div>
        )}
        {hasChild() &&
          child.length > 2 &&
          (hasMore ? (
            <div
              className="loadMore"
              onClick={() => {
                setHasMore(false);
              }}
            >
              加载剩余评论
            </div>
          ) : (
            <div
              className="loadMore"
              onClick={() => {
                setHasMore(true);
              }}
            >
              收起
            </div>
          ))}
      </div>
    </div>
  );
}

export default withRouter(AnswerItem);
