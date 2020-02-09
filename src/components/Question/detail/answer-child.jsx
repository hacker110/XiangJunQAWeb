/*
 * @Description: 答案的评论
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2020-01-12 07:53:29
 * @LastEditTime: 2020-02-08 09:49:57
 */

import React from "react";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { Icon } from "antd-mobile";

function AnswerItem(props) {
  // 文字的最大长度
  const maxLength = 35;
  const { question_id, answer_id } = props.data;
  const { hasMore, data } = props;

  // 展开与合并的开关
  const [flag, setFlag] = useState(false);

  const elipsisText = text => {
    return text.substr(0, maxLength) + "...";
  };

  const openAnswer = () => {
    props.history.push({
      pathname: `/question/questionanswer/${question_id}/${answer_id}`
    });
  };
  const remark = item => {
    return (
      <div className="list-item answer-item answer-child" key={item.id}>
        <div className="list-item__advatorBox">
          <img className="list-item__advator" src={item.head_img} alt="用户头像" />
        </div>
        <div className="list-item__contentBox">
          <div className="list-item__content" style={{ maxHeight: "none" }}>
            {/* 开关打开状态或者内容长度小于最大长度时内容展示 */}
            {flag || item.content.length <= maxLength
              ? item.content
              : elipsisText(item.content)}
            {item.content.length > maxLength && (
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
              <i
                className={"iconfont iconicon-test-copy selectIcon"}
                onClick={openAnswer}
                style={{
                  marginRight: "4px",
                  color: "#38bc6d"
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return data.slice(0, hasMore ? 2 : Infinity).map(item => {
    return remark(item);
  });
}

export default withRouter(AnswerItem);
