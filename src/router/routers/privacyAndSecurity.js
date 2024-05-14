export default [
  {
    path: '/privacyAndSecurity',
    component: () => import('@views/privacyAndSecurity/index.vue'),
    meta: {
      title: '隐私与安全',
      jwt: true
    }
  },
  {
    path: '/privacyAndSecurity/updatePassword',
    component: () => import('@views/privacyAndSecurity/updatePassword.vue'),
    meta: {
      title: '修改密码',
      jwt: true
    }
  },
  {
    path: '/privacyAndSecurity/cancelAccount',
    component: () => import('@/views/privacyAndSecurity/cancelAccount.vue'),
    meta: {
      title: '注销账号',
      jwt: true
    }
  }
]
