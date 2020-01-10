/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors  : Ask
 * @Date: 2019-11-05 08:51:42
 * @LastEditTime : 2020-01-10 14:48:18
 */
import Home from "@comp/home";
import Page404 from "@/components/404/page404";
import PrePage from "@/pages/pre/pre-page.js";
import Mine from "@/pages/mine/mine.js";
// import QuestionBase from "@/pages/question/question-base.js";
import QuestionList from "@/pages/question/question-list.js";
import QuestionDetail from "@/pages/question/question-detail.js";
import QuestionCreate from "@/pages/question/question-create.js";
import QuestionAnswer from "@/pages/question/question-answer.js";

export default [
  {
    path: "/",
    component: Home,
    redirect: "/prepage"
  },
  {
    path: "/prepage",
    component: PrePage
  },
  {
    path: "/question/questionlist",
    component: QuestionList,
    meta: {
      title: "问题列表页"
    }
  },
  {
    path: "/question/questionanswer/:questionId/:answerId?",
    component: QuestionAnswer,
    meta: {
      title: "回答问题"
    }
  },
  {
    path: "/question/mine",
    component: Mine
  },
  {
    path: "/question/questioncreate/:id?",
    component: QuestionCreate
  },
  {
    path: "/question/questiondetail/:id",
    component: QuestionDetail,
    meta: {
      title: "问题详情页"
    }
  },
  {
    path: "/*",
    component: Page404,
    meta: {
      title: "404"
    }
  }
];
