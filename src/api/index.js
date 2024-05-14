import fetch from '@server/index'

/**
 * 获取系统时间
 */
export const GetCurrentTime = () => fetch({
  url: '/currentTime',
  method: 'GET'
})

/**
 * 获取系统时间
 * @param {Object} params 参数对象
 * @param {String} params.uuid 申请时间戳的设备
 * @param {String} params.url 时间戳所用api
 */
export const GetCurrentTimestamp = params => fetch({
  url: '/getTimestamp',
  method: 'POST',
  params
})

/**
 * 获取主题列表
 */
export const FindThemeAll = () => fetch({
  url: '/system/theme',
  method: 'GET'
})

/**
 * 根据ID获取主题
 * @param {Number} id 主题ID
 */
export const FindThemeById = id => fetch({
  url: `/system/theme/${id}`,
  method: 'GET'
})

/**
 * 新增客户反馈信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {Object} params.data.describe 问题和意见
 * @param {Object} params.data.images 图片路径
 * @param {Object} params.data.phone 联系电话
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const AddFeedback = params => fetch({
  url: '/system/feedback/add',
  method: 'POST',
  params
})

/**
 * 新增埋点数据
 * @param {Object} params 参数对象
 * @param {String} params.uuid uuid
 * @param {Number} params.type 类型
 * @param {String} params.page 页面路径
 * @param {String} params.remarks 备注
 */
export const AddBehavior = params => fetch({
  url: '/system/behavior/add',
  method: 'POST',
  params
})
