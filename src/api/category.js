import fetch from '@server/index'

/**
 * 获取所有的分类列表
 */
export const FindCategoryAll = () => fetch({
  url: '/category/findAll',
  method: 'GET'
})

/**
 * 新增分类信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 分类名称
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const AddCategory = params => fetch({
  url: '/category/add',
  method: 'POST',
  params
})

/**
 * 修改分类信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 修改分类参数对象
 * @param {Object} params.data.id 分类ID
 * @param {Object} params.data.name 分类名称
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const UpdateCategory = params => fetch({
  url: '/category/update',
  method: 'POST',
  params
})

/**
 * 删除分类信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 分类ID
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const DeleteCategory = params => fetch({
  url: '/category/delete',
  method: 'POST',
  params
})
