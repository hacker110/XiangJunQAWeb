/*
 * @Description: 知识,分享
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-02-08 09:36:40
 */
// @flow
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Popover, Icon } from "antd-mobile";
import { post } from "@/utils/request.js";
import { QUESTION } from "@/service/api.js";

const alert = Modal.alert;
const Item = Popover.Item;
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

  const onSelect = opt => {
    switch (opt.props.value) {
      case "deleteQuestion":
        deleteQuestion();
        break;
      case "editQuestion":
        editQuestion();
        break;
      default:
        break;
    }
  };
  return (
    <div className="list-item">
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
            <Popover
              mask
              overlayClassName="fortest"
              overlayStyle={{ color: "currentColor" }}
              overlay={[
                <Item key="1" value="deleteQuestion" data-seed="logId">
                  删除
                </Item>,
                <Item
                  key="2"
                  value="editQuestion"
                  style={{ whiteSpace: "nowrap" }}
                >
                  编辑
                </Item>
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0]
              }}
              // onVisibleChange={this.handleVisibleChange}
              onSelect={onSelect}
            >
              <div
                style={{
                  height: "100%",
                  padding: "0 15px",
                  marginRight: "-15px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Icon type="ellipsis" color="#42c57a" />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ListItem);
