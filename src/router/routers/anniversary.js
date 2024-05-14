export default [
  {
    path: '/anniversary/category',
    component: () => import('@views/anniversary/category.vue'),
    meta: {
      title: '分类管理',
      jwt: true
    }
  },
  {
    path: '/anniversary/add',
    component: () => import('@views/anniversary/edit.vue'),
    meta: {
      title: '新增纪念日',
      jwt: true
    }
  },
  {
    path: '/anniversary/update/:id/:num',
    component: () => import('@views/anniversary/edit.vue'),
    meta: {
      title: '修改纪念日',
      jwt: true
    }
  },
  {
    path: '/anniversary/details/:id',
    component: () => import('@views/anniversary/details.vue'),
    meta: {
      title: '纪念日详情',
      jwt: true
    }
  }
]
