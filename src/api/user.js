import fetch from '@server/index'

/**
 * 登录
 * @param {Object} params 参数对象
 * @param {Object} params.data 登录参数对象
 * @param {String} params.data.account 账号
 * @param {String} params.data.password 密码
 * @param {String} params.data.uuid uuid
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const Login = params => fetch({
  url: '/login',
  method: 'POST',
  params
})

/**
 * 临时账户登录
 * @param {Object} params 参数对象
 * @param {String} params.data uuid
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const TemporaryLogin = params => fetch({
  url: '/temporary/login',
  method: 'POST',
  params
})

/**
 * 注册
 * @param {Object} params 参数对象
 * @param {Object} params.data 注册参数对象
 * @param {String} params.data.account 账号
 * @param {String} params.data.password 密码
 * @param {String} params.data.referCode 邀请码
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const Register = params => fetch({
  url: '/register',
  method: 'POST',
  params
})

/**
 * 修改密码
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {String} params.data.originalPassword 原密码
 * @param {String} params.data.newPassword 新密码
 * @param {String} params.data.confirmPassword 确认密码
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const UpdatePassword = params => fetch({
  url: '/user/password/update',
  method: 'POST',
  params
})

/**
 * 获取用户信息
 */
export const GetUserInfo = () => fetch({
  url: '/user/info',
  method: 'GET'
})

/**
 * 获取用户的配置信息
 */
export const GetUserConfig = () => fetch({
  url: '/user/config',
  method: 'GET'
})

/**
 * 修改用户的配置信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {String} params.data.name 字段名
 * @param {String} params.data.value 值
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const SetUserConfig = params => fetch({
  url: '/user/config/update',
  method: 'POST',
  params
})

/**
 * 修改用户头像
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {String} params.data.id 头像ID
 * @param {String} params.data.url 图片路径
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const UpdateAvatar = params => fetch({
  url: '/user/avatar/update',
  method: 'POST',
  params
})

/**
 * 修改用户信息
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {String} params.data.nickname 昵称
 * @param {Number} params.data.gender 性别，1为男，2为女
 * @param {Number} params.data.calendarType 日历类型，1为阳历，2为农历
 * @param {String} params.data.birthday 生日
 * @param {String} params.data.personalizedSignature 个性签名
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 */
export const UpdateInfo = params => fetch({
  url: '/user/info/update',
  method: 'POST',
  params
})

/**
 * 新增用户相册照片
 * @param {Object} params 参数对象
 * @param {Object} params.data 图片路径
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const AddAlbum = params => fetch({
  url: '/user/album/add',
  method: 'POST',
  params
})

/**
 * 修改用户相册照片
 * @param {Object} params 参数对象
 * @param {Object} params.data 参数对象
 * @param {Object} params.data.id 图片ID
 * @param {Object} params.data.image 图片路径
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const UpdateAlbum = params => fetch({
  url: '/user/album/update',
  method: 'POST',
  params
})

/**
 * 删除用户相册照片
 * @param {Object} params 参数对象
 * @param {Object} params.data 图片ID
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const DeleteAlbum = params => fetch({
  url: '/user/album/delete',
  method: 'POST',
  params
})

/**
 * 注销申请
 * @param {Object} params 参数对象
 * @param {String} params.data uuid
 * @param {Number} params.time 时间戳
 * @param {String} params.sign 加密方式
 * @param {String} params.salt 盐
 */
export const LogoffApply = params => fetch({
  url: '/user/apply/logoff',
  method: 'POST',
  params
})
