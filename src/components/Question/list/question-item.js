/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-12-11 22:41:55
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
  const {
    collection_count,
    like_count,
    content,
    question_id,
    like_status = false,
    collection_status = false
  } = props.data;

  const [collection, setCollection] = useState(collection_count);
  const [like, setLike] = useState(like_count);
  const [likeStatus, setLikeStatus] = useState(like_status);
  const [collectionStatus, setCollectionStatus] = useState(collection_status);

  const dealData = number => {
    number = +number;
    return number.toLocaleString();
  };
  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };
  const collect = () => {
    const { question_id, create_user_id } = props.data;
    post(QUESTION.SAVE_QUESTION_COLLECTION, {
      question_id: question_id,
      create_user_id: create_user_id,
      like_user_id: 1
    }).then(res => {
      setCollection(collection + 1);
      setCollectionStatus(true);
      console.log("collect", res);
    });
  };
  const unCollect = () => {
    setCollection(collection - 1);
    setCollectionStatus(false);
    // const { question_id, create_user_id } = props.data;
    // post(QUESTION.SAVE_QUESTION_COLLECTION, {
    //   question_id: question_id,
    //   create_user_id: create_user_id,
    //   like_user_id: 1
    // }).then(res => {
    //   setCollection(collection + 1);
    //   console.log("collect", res);
    // });
  };
  const likeFun = () => {
    const { question_id, create_user_id } = props.data;
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: create_user_id,
      question_id: question_id,
      like_user_id: 1
    }).then(res => {
      setLike(like + 1);
      setLikeStatus(true);
      console.log("like", res);
    });
  };

  const unLikeFun = () => {
    setLike(like - 1);
    setLikeStatus(false);
    // const { question_id, create_user_id } = props.data;
    // post(QUESTION.SAVE_QUESTION_LIKES, {
    //   create_user_id: create_user_id,
    //   question_id: question_id,
    //   like_user_id: 1
    // }).then(res => {
    //   console.log("like", res);
    // });
  };
  const openAnswer = () => {
    const { question_id } = props.data;
    props.history.push({
      pathname: `/question/questionanswer/${question_id}`
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
            {collectionStatus ? (
              <span
                className="question-itemDetailBtns txt-btn"
                onClick={unCollect}
                style={{ marginRight: "4px" }}
              >
                取消关注
              </span>
            ) : (
              <span
                className="question-itemDetailBtns txt-btn"
                onClick={collect}
                style={{ marginRight: "4px" }}
              >
                关注
              </span>
            )}
            {likeStatus ? (
              <span
                className="question-itemDetailBtns txt-btn"
                onClick={unLikeFun}
                style={{ marginRight: "4px" }}
              >
                取消点赞
              </span>
            ) : (
              <span
                className="question-itemDetailBtns txt-btn"
                onClick={likeFun}
                style={{ marginRight: "4px" }}
              >
                点赞
              </span>
            )}
            <span
              className="question-itemDetailBtns txt-btn"
              style={{ marginRight: "4px" }}
              onClick={openAnswer}
            >
              回答
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ListItem);
