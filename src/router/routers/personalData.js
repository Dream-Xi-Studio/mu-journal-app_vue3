export default [
  {
    path: '/personalData',
    component: () => import('@/views/personalData/index.vue'),
    meta: {
      title: '个人资料',
      jwt: true
    }
  },
  {
    path: '/personalData/editPhotos',
    component: () => import('@/views/personalData/editPhotos.vue'),
    meta: {
      title: '编辑照片',
      jwt: true
    }
  }
]
