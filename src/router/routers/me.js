export default [
  {
    path: '/me/personalizedDress',
    component: () => import('@views/me/personalizedDress.vue'),
    meta: {
      title: '个性装扮',
      jwt: true
    }
  },
  {
    path: '/me/customerService',
    component: () => import('@views/me/customerService.vue'),
    meta: {
      title: '联系客服',
      jwt: false
    }
  }
]
