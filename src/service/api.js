/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-11-17 22:00:55
 * @LastEditTime : 2020-01-08 17:16:43
 */
export const QUESTION = {
  // 添加问题
  ADD_QUESTION: "/api/question/addquestion",
  // 得到指定用户收藏的问题
  GET_COLLECTION_QUESTION: "/api/question/getCollectionQuestion",
  // 得到指定用户关注作者的问题
  GET_COLLECTION_QUESTION_BY_UID: "/api/question/getCollectionQuestionByUserId",
  // 获得最新问题
  GET_NEW_QUESTION: "/api/question/getNewQuestion",
  // 通过问题ID获取问题
  GET_QUESTION_BY_ID: "/api/question/getQuestionById",
  // 通过用户UID获取问题
  GET_QUESTION_BY_UID: "/api/question/getQuestionByUserId",
  // 保存问题的答案评论
  SAVE_QUESTION_ANSWER: "/api/question/saveQuestionAnswer",
  // 获取问题答案
  GET_QUESTION_ANSWER_BY_QUESTIONID:
    "/api/question/getQuestionAnswerByQuesitonId",
  // 收藏问题
  SAVE_QUESTION_COLLECTION: "/api/question/saveQuestioncollection",
  // 取消收藏问题
  CANCLE_QUESTION_COLLECTION: "/api/question/cancelQuestionCollection",
  // 保存问题点赞
  SAVE_QUESTION_LIKES: "/api/question/saveQuestionlikes",
  // 取消问题点赞
  CANCLE_QUESTION_LIKES: "/api/question/cancelQuestionlikes",
  // 更新问题
  UPDATE_QUESTION: "/api/question/updateQuestion"
};
export const SUBJECT = {
  // 添加问题
  GET_ALL_SUBJECT: "/api/subject/getAllSubject"
  // 得到指定用户收藏的问题
};

export const USER = {
  // 通过微信的openid查找用户信息
  GET_USER_BY_OPENID: "/api/user/GetUserByOpenId",
  // 用户绑定科目
  USER_BIND_SUBJECT: "/api/user/UserBindSubject",
  // 关注用户
  COLLECTION_USER: "/api/user/CollectionUser",
  // 取消关注用户
  CANCLE_COLLECTION_USER: "/api/user/CancelCollectionUser",
  // 得到所有被关注的用户
  GET_COLLECTION_USER: "/api/user/user/GetCollectionUser"
};
export const FILE = {
  // 上传图片
  SAVE_FILE: "/api/qaFile/saveFile"
};

// export const host = "http://115.29.65.101:8888";
export const host = "http://www.xiangjun325.com";
