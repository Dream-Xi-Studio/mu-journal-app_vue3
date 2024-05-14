import fetch from '@server/index'

/**
 * 根据分类获取纪念日列表
 * @param {Object} params 参数对象
 * @param {Object} params.data 分类ID
 * @param {Object} params.pages 分页对象
 * @param {Number} params.pages.page 页数
 * @param {Number} params.pages.limit 条数
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const FindByCategory = params => fetch({
  url: '/anniversary/findByCategory',
  method: 'POST',
  params
})

/**
 * 获取重复字典列表
 */
export const FindRepeatAll = () => fetch({
  url: '/anniversary/repeat',
  method: 'GET'
})

/**
 * 获取提醒字典列表
 */
export const FindReminderAll = () => fetch({
  url: '/anniversary/reminder',
  method: 'GET'
})

/**
 * 新增纪念日信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {String} params.data.title 标题
 * @param {Number} params.data.categoryId 分类ID
 * @param {Number} params.data.calendarType 日历类型
 * @param {String} params.data.targetTime 目标日
 * @param {Number} params.data.repeatId 重复ID
 * @param {Number} params.data.reminderId 提醒ID
 * @param {String} params.data.reminderTime 提醒时间
 * @param {Number} params.data.sign 是否置顶
 * @param {String} params.data.remarks 备注
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const AddAnniversary = params => fetch({
  url: '/anniversary/add',
  method: 'POST',
  params
})

/**
 * 根据id修改该纪念日为是否置顶
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {String} params.data.id 纪念日ID
 * @param {Number} params.data.sign 是否置顶
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const Topping = params => fetch({
  url: '/anniversary/topping',
  method: 'POST',
  params
})

/**
 * 根据id删除该纪念日数据
 * @param {Object} params 参数对象
 * @param {Number} params.data 纪念日ID
 * @param {Number} params.data.sign 是否置顶
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const DeleteAnniversaryById = params => fetch({
  url: '/anniversary/delete',
  method: 'POST',
  params
})

/**
 * 根据id获取该纪念日数据
 * @param {Number} id 纪念日ID
 */
export const FindAnniversaryById = id => fetch({
  url: `/anniversary/findOne/${id}`,
  method: 'GET'
})

/**
 * 修改纪念日信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {String} params.data.id 纪念日ID
 * @param {String} params.data.title 标题
 * @param {Number} params.data.categoryId 分类ID
 * @param {Number} params.data.calendarType 日历类型
 * @param {String} params.data.targetTime 目标日
 * @param {Number} params.data.repeatId 重复ID
 * @param {Number} params.data.reminderId 提醒ID
 * @param {String} params.data.reminderTime 提醒时间
 * @param {Number} params.data.sign 是否置顶
 * @param {String} params.data.remarks 备注
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const UpdateAnniversary = params => fetch({
  url: '/anniversary/update',
  method: 'POST',
  params
})
