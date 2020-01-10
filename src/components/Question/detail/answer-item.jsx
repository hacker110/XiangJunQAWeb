import React from "react";
import { withRouter } from "react-router-dom";
import teacher from "@/assets/teacher.png";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";
import { useState } from "react";
import { Icon } from "antd-mobile";

function AnswerItem(props) {
  // 文字的最大长度
  const maxLength = 35;
  const {
    content,
    like_count,
    like_status,
    question_id,
    create_user_id,
    answer_id,
    is_like,
    collection_count,
    collection_status
  } = props.data;
  const { userInfo } = props;

  const [likeStatus, setLikeStatus] = useState(Boolean(is_like));
  // const [collection, setCollection] = useState(collection_count);
  // const [collectionStatus, setCollectionStatus] = useState(collection_status);

  // 展开与合并的开关
  const [flag, setFlag] = useState(false);

  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };

  const dealData = number => {
    number = +number;
    return number.toLocaleString();
  };

  const likeFun = () => {
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: create_user_id,
      question_id: question_id,
      like_user_id: userInfo.id,
      question_answer_id: answer_id //0 对问题点赞，评论点赞,（评论的ID）
    }).then(res => {
      setLikeStatus(true);
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
      console.log("like", res);
    });
  };

  const openAnswer = () => {
    props.history.push({
      pathname: `/question/questionanswer/${question_id}/${answer_id}`
    });
  };

  return (
    <div className="list-item answer-item">
      <div className="list-item__advatorBox">
        <img className="list-item__advator" src={teacher} alt="用户头像" />
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
        <div className="list-item__control">
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
      </div>
    </div>
  );
}

export default withRouter(AnswerItem);
