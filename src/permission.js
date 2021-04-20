import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  getPHPSESSION
} from '@/common/utils/auth'

router.beforeEach((to, from, next) => {
  if (getToken()) { // 有权限,继续往下跳转
    if (store.getters.addRouters.length === 0) { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          console.log('addRoutes', store.getters.addRouters)
          if (to.path == "/" && store.getters.addRouters[0].redirect) {
            next({
              path: store.getters.addRouters[0].redirect
            })
          } else {
            next({ ...to,
              replace: true
            })
          } // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }).catch((err) => {
        // store.dispatch('FedLogOut').then(() => {
          // Message.error('验证失败，请重新登录!')
          window.location.href = process.env.BASE_API + "/dist/admin/index.html";
          next()
        // })
      })
    } else {
      NProgress.done();
      next()
    }
  } else {
    window.location.href = process.env.BASE_API + "/dist/login/index.html#/privateLogin?branch=report";
    //不存在role信息就是去登录页
    next();
    return
  }
});