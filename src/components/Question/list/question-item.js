/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-01-08 11:07:18
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
  const {
    collection_count,
    like_count,
    content,
    question_id,
    create_user_id,
    is_like = 0,
    is_collection = 0
  } = props.data;
  const [like, setLike] = useState(like_count);
  const [likeStatus, setLikeStatus] = useState(is_like);
  const [collectionStatus, setCollectionStatus] = useState(is_collection);
  const [collection, setCollection] = useState(collection_count);

  const dealData = number => {
    number = +number;
    return number.toLocaleString();
  };
  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };
  const collect = () => {
    post(QUESTION.SAVE_QUESTION_COLLECTION, {
      question_id: question_id,
      create_user_id: create_user_id,
      collection_user_id: userInfo.id
    }).then(res => {
      setCollection(collection + 1);
      setCollectionStatus(1);
      console.log("collect", res);
    });
  };
  const unCollect = () => {
    post(QUESTION.CANCLE_QUESTION_COLLECTION, {
      question_id: question_id,
      create_user_id: create_user_id,
      collection_user_id: userInfo.id
    }).then(res => {
      setCollection(collection - 1);
      setCollectionStatus(0);
    });
  };
  const likeFun = () => {
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: create_user_id,
      question_id: question_id,
      like_user_id: userInfo.id,
      question_answer_id: 0 // 是问题则值id=0 如果是评论则是评论的id
    }).then(res => {
      setLike(like + 1);
      setLikeStatus(1);
      console.log("like", res);
    });
  };

  const unLikeFun = () => {
    post(QUESTION.CANCLE_QUESTION_LIKES, {
      like_user_id: userInfo.id,
      question_id: question_id,
      question_answer_id: 0 //0 对问题点赞，评论点赞,（评论的ID）
    }).then(res => {
      setLike(like - 1);
      setLikeStatus(0);
      console.log("like", res);
    });
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
                className={"iconfont icondianzandianji selectIcon selectedIcon"}
                style={{ marginRight: "10px" }}
              ></i>
            ) : (
              <i
                onClick={likeFun}
                className={
                  "iconfont icondianzandianji selectIcon unselectedIcon"
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
      </div>
    </div>
  );
}

export default withRouter(ListItem);
