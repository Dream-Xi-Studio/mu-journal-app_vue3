export default [
  {
    path: '/help',
    component: () => import('@views/help/index.vue'),
    meta: {
      title: '帮助中心',
      jwt: false
    }
  },
  {
    path: '/help/updatePassword',
    component: () => import('@views/help/updatePassword.vue'),
    meta: {
      title: '帮助中心',
      jwt: false
    }
  },
  {
    path: '/help/retrievePassword',
    component: () => import('@views/help/retrievePassword.vue'),
    meta: {
      title: '帮助中心',
      jwt: false
    }
  },
  {
    path: '/help/stolen',
    component: () => import('@views/help/stolen.vue'),
    meta: {
      title: '帮助中心',
      jwt: false
    }
  },
  {
    path: '/help/freezeBanned',
    component: () => import('@views/help/freezeBanned.vue'),
    meta: {
      title: '帮助中心',
      jwt: false
    }
  }
]
