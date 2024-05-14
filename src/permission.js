import router from './router'
import store from '@store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@utils/get-page-title'
import { AddBehavior } from '@api/index'

// NProgress配置
NProgress.configure({ showSpinner: false })

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  if (store.getters.getUser('info').token) {
    if (['/excessive', '/login', '/register'].includes(to.path)) {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (to.meta.jwt) {
      store.dispatch('user/LogOut')
      next({ path: '/' })
    } else {
      next()
    }
  }
})

// 全局后置钩子
router.afterEach(async (to) => {
  try {
    await AddBehavior({
      uuid: store.getters.getApp('uuid'),
      type: 1,
      page: to.path,
      remarks: `访问${to.meta.title}页面`
    })
  } catch { }
  // 完成进度条
  NProgress.done()
})
