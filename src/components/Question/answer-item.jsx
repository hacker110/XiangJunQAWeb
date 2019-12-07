import React from "react";
import teacher from "@/assets/teacher.png";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

function AnswerItem(props) {
  // 文字的最大长度
  const maxLength = 35;
  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };
  const dealData = number => {
    number = +number;
    return number.toLocaleString();
  };
  const { content, like_count, collection_count } = props.data;
  const like = () => {
    const { id, user_id } = this.state;
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: user_id,
      question_id: id,
      like_user_id: 1
    }).then(res => {
      this.setState(prev => ({ LikeCount: prev.LikeCount + 1 }));
      // this.setState(prev => ({ like_count: prev.like_count + 1 }));
      console.log("like", res);
    });
  };

  return (
    <div className="list-item answer-item">
      <div className="list-item__advatorBox">
        <img className="list-item__advator" src={teacher} alt="用户头像" />
      </div>
      <div className="list-item__contentBox">
        <div className="list-item__content">
          {content.length > maxLength ? elipsisText(content) : content}
          {content.length > maxLength && (
            <span className="list-item__contentCheck">查看详情</span>
          )}
        </div>
        <div className="list-item__control">
          <div className="list-item__control--status"></div>
          <div className="list-item__control--btn">
            <span
              className="question-itemDetailBtns txt-btn"
              onClick={like}
              style={{ marginRight: "4px" }}
            >
              点赞
            </span>
            <span
              className="question-itemDetailBtns txt-btn"
              style={{ marginRight: "4px" }}
            >
              回答
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerItem;
