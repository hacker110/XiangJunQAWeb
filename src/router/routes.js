/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-05 08:51:42
 * @LastEditTime: 2019-11-09 16:16:41
 */
import Home from '@comp/home';
import Page404 from '@commonComp/page404';
import PrePage from '@/pages/pre/pre-page.js';
import QuestionBase from '@/pages/question/question-base.js';
import QuestionList from '@/pages/question/question-list.js';
import QuestionDetail from '@/pages/question/question-detail.js';

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
    // redirect: '/question/questionlist',
    children: [
      {
        path: '/question/questionlist',
        component: QuestionList,
        meta: {
          title: '问题列表页'
        }
      },
      {
        path: '/question/questiondetail',
        component: QuestionDetail,
        meta: {
          title: '问题详情页'
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
