import React from "react";
import teacher from "@/assets/teacher.png";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";
import { useState } from "react";
import { Icon } from "antd-mobile";


function AnswerItem(props) {
  // 文字的最大长度
  const maxLength = 35;
  const { content, like_count } = props.data;

  // 展开与合并的开关
  const [flag, setFlag] = useState(false);

  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };

  const dealData = number => {
    number = +number;
    return number.toLocaleString();
  };

  const like = () => {
    console.log("like");
    // const { id, user_id } = this.state;
    // post(QUESTION.SAVE_QUESTION_LIKES, {
    //   create_user_id: user_id,
    //   question_id: id,
    //   like_user_id: 1
    // }).then(res => {
    //   // this.setState(prev => ({ LikeCount: prev.LikeCount + 1 }));
    //   // this.setState(prev => ({ like_count: prev.like_count + 1 }));
    //   console.log("like", res);
    // });
  };

  const remark = () => {

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
              onClick={remark}
            >
              评论
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerItem;
