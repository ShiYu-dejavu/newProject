import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/index'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [];

export default new Router({
  // mode: "history", // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

// export default new Router({
//   routes: [{
//     path: '/register',
//     component: layout,
//     redirect: '/register/list',
//     name: 'register',
//     lastMenu: true,
//     meta: {
//       title: '举报投诉登记',
//       icon: 'iconnav_dengji_icon'
//     },
//     children: [{
//       path: 'list',
//       component: () =>
//         import ("@/views/register/list"),
//       hidden: false,
//       meta: {
//         title: '举报投诉列表',
//         btns: [{
//           name: "编辑"
//         }, {
//           name: "受理"
//         }, {
//           name: "不予受理"
//         }, {
//           name: "转案件"
//         }, {
//           name: "删除"
//         }]
//       },
//       name: 'list'
//     }, {
//       path: 'report',
//       component: () =>
//         import ("@/views/register/report"),
//       hidden: false,
//       meta: {
//         title: '举报登记'
//       },
//       name: 'report'
//     }, {
//       path: 'complaint',
//       component: () =>
//         import ("@/views/register/complaint"),
//       hidden: false,
//       meta: {
//         title: '投诉登记'
//       },
//       name: 'complaint'
//     }]
//   }, {
//     path: '/query',
//     component: layout,
//     redirect: '/query/index',
//     name: 'query',
//     lastMenu: true,
//     meta: {
//       title: '举报投诉查询',
//       icon: 'iconnav_chaxun_icon'
//     },
//     children: [{
//       path: 'index',
//       component: () =>
//         import ("@/views/query/index"),
//       hidden: true,
//       meta: {
//         title: '投诉登记查询'
//       },
//       name: 'query/index'
//     }, {
//       path: 'detail',
//       component: () =>
//         import ("@/views/query/detail"),
//       hidden: true,
//       meta: {
//         title: '举报投诉详情',
//         btns: [{
//           name: '编辑'
//         }, {
//           name: '受理'
//         }, {
//           name: '不予受理'
//         }, {
//           name: '转案件'
//         }, {
//           name: '删除'
//         }]
//       },
//       name: 'query/detail'
//     }]
//   }, {
//     path: '/recycle',
//     component: layout,
//     redirect: '/recycle/index',
//     name: 'recycle',
//     lastMenu: true,
//     meta: {
//       title: '回收站',
//       icon: 'iconnav_huishouzhan_icon'
//     },
//     children: [{
//       path: 'index',
//       component: () =>
//         import ("@/views/recycle/index"),
//       hidden: true,
//       meta: {
//         title: '回收站'
//       },
//       name: 'recycle/index'
//     }]
//   }]
// })