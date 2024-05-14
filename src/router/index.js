import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import store from '@store/index'
import Home from '@views/main/index.vue'
import Excessive from '@views/main/excessive.vue'
// 底部导航路由
import tabbar from './tabbar'
import { getModule } from '@utils/index'

const routes = [
  {
    path: '/', redirect: () => {
      if (store.getters.getUser('info').token) {
        return '/home'
      } else {
        return '/excessive'
      }
    }
  },
  {
    path: '/excessive',
    component: Excessive,
    meta: {
      title: '过度页',
      jwt: false
    }
  },
  {
    path: '/login',
    component: () => import('@views/main/login.vue'),
    meta: {
      title: '登录',
      jwt: false
    }
  },
  {
    path: '/register',
    component: () => import('@views/main/register.vue'),
    meta: {
      title: '注册',
      jwt: false
    }
  },
  {
    path: '/home',
    redirect: '/home/anniversary',
    component: Home,
    children: tabbar
  }
]

// 获取routers目录下所有路由
const routesList = getModule(require.context('./routers', true, /\.js$/))
for (const key in routesList) {
  routes.push(...routesList[key])
}

const router = createRouter({
  history: process.env.VUE_APP_MODE == 'hash' && createWebHashHistory(process.env.BASE_URL) || process.env.VUE_APP_MODE == 'history' && createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes
})

export default router
