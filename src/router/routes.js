/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-05 08:51:42
 * @LastEditTime: 2019-11-16 14:15:25
 */
import Home from "@comp/home";
import Page404 from "@/components/404/page404";
import PrePage from "@/pages/pre/pre-page.js";
import Mine from "@/pages/mine/mine.js";
import QuestionBase from "@/pages/question/question-base.js";
import QuestionList from "@/pages/question/question-list.js";
import QuestionDetail from "@/pages/question/question-detail.js";
import QuestionCreate from "@/pages/question/question-create.js";

export default [
  {
    path: "/",
    component: Home,
    redirect: "/question/questionlist"
  },
  {
    path: "/prepage",
    component: PrePage
  },
  {
    path: "/question",
    component: QuestionBase,
    meta: {
      title: "问题基页面"
    },
    // redirect: '/question/questionlist',
    children: [
      {
        path: "/question/questionlist",
        component: QuestionList,
        meta: {
          title: "问题列表页"
        }
      },
      {
        path: "/question/mine",
        component: Mine
      },
      {
        path: "/question/questioncreate",
        component: QuestionCreate
      }
    ]
  },
  {
    path: "/questiondetail",
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
