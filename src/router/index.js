/*
 * @Author: 未知
 * @Date: 2020-08-03 10:42:14
 * @LastEditTime: 2020-09-01 15:00:16
 * @LastEditors: Please set LastEditors
 * @Description: 新增优惠券页路由
 */

const routes = [
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        exact: true,
        path: '/preview',
        component: '@/pages/preview',
      },
      {
        exact: true,
        path: '/',
        component: '@/pages/index',
      },
    ],
  },
];

export default routes;
