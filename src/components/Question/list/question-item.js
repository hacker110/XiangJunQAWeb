/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2019-12-20 09:16:06
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
            )}
            <i
              className={
                "iconfont iconicon-test-copy selectIcon"
              }
              onClick={openAnswer}
              style={{ marginRight: "4px",color:'#38bc6d' }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ListItem);
