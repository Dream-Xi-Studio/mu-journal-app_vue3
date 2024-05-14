// 底部导航栏
export default [
  {
    path: 'anniversary',
    component: () => import('@views/anniversary/index.vue'),
    meta: {
      title: '首页',
      icon: 'mj-home-page',
      jwt: true
    }
  },
  {
    path: 'me',
    component: () => import('@views/me/index.vue'),
    meta: {
      title: '我的',
      icon: 'mj-my',
      jwt: true
    }
  }
]
