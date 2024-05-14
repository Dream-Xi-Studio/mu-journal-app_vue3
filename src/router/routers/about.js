export default [
  {
    path: '/about',
    component: () => import('@views/about/index.vue'),
    meta: {
      title: '关于暮手记',
      jwt: false
    }
  },
  {
    path: '/about/functionDetail',
    component: () => import('@views/about/functionDetail.vue'),
    meta: {
      title: '版本更新记录',
      jwt: false
    }
  },
  {
    path: '/about/feedback',
    component: () => import('@views/about/feedback.vue'),
    meta: {
      title: '意见反馈',
      jwt: true
    }
  },
  {
    path: '/about/service',
    component: () => import('@views/about/service.vue'),
    meta: {
      title: '服务协议',
      jwt: false
    }
  },
  {
    path: '/about/privacy',
    component: () => import('@views/about/privacy.vue'),
    meta: {
      title: '隐私政策',
      jwt: false
    }
  }
]
