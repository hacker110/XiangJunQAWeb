/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-05 08:51:42
 * @LastEditTime: 2019-11-07 00:16:45
 */
import Home from '@comp/home';
import Page404 from '@commonComp/page404';
import PrePage from '@/pages/pre/pre-page.js';
import QuestionList from '@/pages/question/question-list.js';
import QuestionBase from '@/pages/question/question-base.js';

export default [
  {
    path: '/',
    component: Home,
    redirect: '/prepage'
  },
  {
    path: '/prepage',
    component: PrePage
  },
  {
    path: '/question',
    component: QuestionBase,
    meta: {
      title: '问题基页面'
    },
    children: [
      {
        path: '/question/questionlist',
        component: QuestionList,
        meta: {
          title: '问题列表页'
        }
      }
    ]
  },
  {
    path: '/*',
    component: Page404,
    meta: {
      title: '404'
    }
  }
];
