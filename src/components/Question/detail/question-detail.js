/*
 * @Description: 问题详情头部
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime : 2020-02-06 21:02:17
 */
// @flow
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { post } from "@/utils/request.js";
import { QUESTION, USER } from "@/service/api.js";

class QuestionItem extends Component<{}, {}> {
  constructor(props) {
    super(props);
    const { questionId } = this.props.match.params;
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.state = {
      id: questionId,
      userInfo,
      CollectionCount: 0,
      LikeCount: "",
      content: "",
      icon: "",
      user_id: 0,
      isLike: false,
      isCollection: false,
      isCollectionAuthor: false
    };
    this.focusUser = this.focusUser.bind(this);
    this.cancleFocusUser = this.cancleFocusUser.bind(this);
    this.like = this.like.bind(this);
    this.unLike = this.unLike.bind(this);
    this.collection = this.collection.bind(this);
    this.unCollection = this.unCollection.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  focusUser() {
    const { user_id, userInfo } = this.state;
    post(USER.COLLECTION_USER, {
      collection_user_id: user_id,
      user_id: userInfo.id
    }).then(res => {
      this.setState({ isCollectionAuthor: true });
    });
  }

  cancleFocusUser() {
    const { user_id, userInfo } = this.state;
    post(USER.CANCLE_COLLECTION_USER, {
      collection_user_id: user_id,
      user_id: userInfo.id
    }).then(res => {
      this.setState({ isCollectionAuthor: false });
    });
  }

  like() {
    const { id, user_id, userInfo, LikeCount } = this.state;
    post(QUESTION.SAVE_QUESTION_LIKES, {
      create_user_id: user_id,
      question_id: id,
      like_user_id: userInfo.id
    }).then(res => {
      this.setState({ isLike: true, LikeCount: LikeCount + 1 });
    });
  }

  unLike() {
    const { id, userInfo, LikeCount } = this.state;
    post(QUESTION.CANCLE_QUESTION_LIKES, {
      question_answer_id: 0, //如果是问题则值id=0 如果是评论则是评论的id
      question_id: id,
      like_user_id: userInfo.id
    }).then(res => {
      this.setState({ isLike: false, LikeCount: LikeCount - 1 });
    });
  }

  collection() {
    const { id, user_id, userInfo, CollectionCount } = this.state;
    post(QUESTION.SAVE_QUESTION_COLLECTION, {
      question_id: id,
      create_user_id: user_id,
      collection_user_id: userInfo.id
    }).then(res => {
      this.setState({
        isCollection: true,
        CollectionCount: CollectionCount + 1
      });
    });
  }

  unCollection() {
    const { id, user_id, userInfo, CollectionCount } = this.state;
    post(QUESTION.CANCLE_QUESTION_COLLECTION, {
      question_id: id,
      create_user_id: user_id,
      collection_user_id: userInfo.id
    }).then(res => {
      this.setState({
        isCollection: false,
        CollectionCount: CollectionCount - 1
      });
    });
  }

  getData() {
    const { id, userInfo } = this.state;
    post(QUESTION.GET_QUESTION_BY_ID, {
      id: id,
      user_id: userInfo.id
    }).then(res => {
      const {
        content,
        CollectionCount,
        LikeCount,
        user_id,
        is_like,
        is_collection,
        is_collection_author,
        head_img
      } = res.data;
      this.setState({
        head_img,
        user_id,
        content,
        CollectionCount,
        LikeCount,
        icon: "https://avatars2.githubusercontent.com/u/25131706?s=40&v=4",
        isLike: Boolean(is_like),
        isCollection: Boolean(is_collection),
        isCollectionAuthor: Boolean(is_collection_author)
      });
    });
  }

  dealData(number) {
    number = +number;
    return number.toLocaleString();
  }

  render() {
    const {
      id,
      content,
      head_img,
      CollectionCount,
      LikeCount,
      isLike,
      isCollection,
      isCollectionAuthor
    } = this.state;
    return (
      <div data-question={id} className="question-itemDetail">
        <div className="question-itemDetail-box">
          <div className="question-itemDetail-imgBox">
            <img src={head_img} alt="用户的icon" />
          </div>
          <div className="question-itemDetail-txtBox">{content}</div>
        </div>
        <div className="question-itemDetail-bottom">
          <div className="question-itemDetail-status">
            <div className="list-item__control--status">
              <span>{this.dealData(CollectionCount)}&nbsp;收藏</span>
              &nbsp;·&nbsp;
              <span>{this.dealData(LikeCount)}&nbsp;赞同</span>
            </div>
          </div>
          <div className="question-itemDetail-tools">
            {isLike ? (
              <i
                onClick={this.unLike}
                className={"iconfont icondiancai1-copy selectIcon selectedIcon"}
                style={{ marginRight: "10px" }}
              ></i>
            ) : (
              <i
                onClick={this.like}
                className={
                  "iconfont icondiancai1-copy selectIcon unselectedIcon"
                }
                style={{ marginRight: "10px" }}
              ></i>
            )}
            {isCollection ? (
              <i
                onClick={this.unCollection}
                className={"iconfont iconfavor-active selectIcon selectedIcon"}
                style={{ marginRight: "10px" }}
              ></i>
            ) : (
              <i
                onClick={this.collection}
                className={
                  "iconfont iconfavor-active selectIcon unselectedIcon"
                }
                style={{ marginRight: "10px" }}
              ></i>
            )}
            {isCollectionAuthor ? (
              <i
                onClick={this.cancleFocusUser}
                className={"iconfont iconguanzhu selectIcon selectedIcon"}
                style={{ marginRight: "10px" }}
              ></i>
            ) : (
              <i
                onClick={this.focusUser}
                className={"iconfont iconguanzhu selectIcon unselectedIcon"}
                style={{ marginRight: "10px" }}
              ></i>
            )}
            <i
              className={"iconfont iconicon-test-copy selectIcon selectedIcon"}
              onClick={() => {
                this.props.history.push({
                  pathname: `/question/questionanswer/${id}`
                });
              }}
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuestionItem);