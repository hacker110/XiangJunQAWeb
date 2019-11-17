/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-17 22:00:55
 * @LastEditTime: 2019-11-17 22:08:55
 */
export const QUESTION = {
  // 添加问题
  ADD_QUESTION: "/question/addquestion",
  // 得到指定用户收藏的问题
  GET_COLLECTION_QUESTION: "/question/getCollectionQuestion",
  // 得到指定用户关注作者的问题
  GET_COLLECTION_QUESTION_BY_UID: "/question/getCollectionQuestionByUserId",
  // 获得最新问题
  GET_NEW_QUESTION: "/question/getNewQeustion",
  // 通过问题ID获取问题
  GET_QUESTION_BY_ID: "/question/getQuestionById",
  // 通过用户UID获取问题
  GET_QUESTION_BY_UID: "/question/getQuestionByUserId",
  // 保存问题的答案评论
  SAVE_QUESTION_ANSWER: "/question/saveQuestionAnswer",
  // 收藏问题
  SAVE_QUESTION_COLLECTION: "/question/saveQuestioncollection",
  // 保存问题点赞
  SAVE_QUESTION_LIKES: "/question/saveQuestionlikes"
};
