/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-05 08:51:42
 * @LastEditTime: 2019-11-06 23:07:19
 */
import Home from '@comp/home';
import Page404 from '@commonComp/page404';
import QuestionList from '@/pages/question/question-list.js';
import PrePage from '@/pages/pre/pre-page.js';

export default [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: PrePage,
        meta: {
          title: '预载页'
        }
      },
      {
        path: '/questionlist',
        component: QuestionList,
        meta: {
          title: '问题列表页'
        }
      },
      {
        path: '/*',
        component: Page404,
        meta: {
          title: '404'
        }
      }
    ]
  }
];
