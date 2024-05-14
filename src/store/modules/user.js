import { GetUserInfo, GetUserConfig } from '@api/user'

/**
 * @method 给key值添加前缀
 * @param {String} key
 */
const addPrefix = (key) => {
  return `${Storage.get('user_id')}_user-${key}`
}

const state = {
  // 用户账号密码对象数组
  users: Storage.get('users') || '',
  // 用户信息
  info: Storage.get(addPrefix('info')) || '',
  // 用户配置信息
  config: Storage.get(addPrefix('config')) || ''
}

const mutations = {
  /**
   * 修改用户账号密码对象数组
   * @param {Object} state - vuex的state对象
   * @param {String} users - 参数
   */
  SET_USERS: (state, users) => {
    state.users = users
    Storage.set('users', users)
  },
  /**
   * 修改state中的值
   * @param {Object} state - vuex的state对象
   * @param {Object} params - 参数
   */
  SET: (state, params) => {
    const keys = Object.keys(params)
    keys.forEach(key => {
      state[key] = params[key]
      Storage.set(addPrefix(key), params[key])
    })
  },
  /**
   * @method 退出登录
   */
  LOGOUT: state => {
    state.info = ''
    state.config = ''
    sessionStorage.clear()
    Storage.clearKey(Storage.get('user_id'))
    Storage.remove('user_id')
  }
}

const actions = {
  /**
   * 新增用户
   * @param {Object} params - 用户账号密码对象
   */
  async AddUser({ state, commit }, params) {
    let users = []
    // 判断本地是否有用户列表
    if (state.users) {
      // 有则解密出来
      users = JSON.parse(Dense.decrypt(state.users))
    }
    // 删除需要添加的账号
    users = users.filter(item => item.account != params.account)
    // 把添加的账号放在第一位
    users.unshift(params)
    // 加密后放回缓存中
    commit('SET_USERS', Dense.encrypt(users))
  },
  /**
   * 删除用户
   */
  async DeleteUser({ state, commit }, params) {
    try {
      let users = JSON.parse(Dense.decrypt(state.users))
      // 删除账号
      users = users.filter(item => item.account != params)
      // 加密后放回缓存中
      commit('SET_USERS', Dense.encrypt(users))
      return Promise.resolve('删除成功')
    } catch {
      return Promise.resolve('删除失败')
    }
  },
  /**
   * 获取用户信息
   */
  async GetUserInfo({ state, commit }) {
    try {
      const res = await GetUserInfo()
      commit('SET', {
        info: Dense.encrypt({
          ...JSON.parse(Dense.decrypt(state.info)),
          ...JSON.parse(Dense.decrypt(res))
        })
      })
    } catch { }
  },
  /**
   * 获取用户配置信息
   */
  async GetUserConfig({ commit }) {
    try {
      const res = await GetUserConfig()
      commit('SET', { config: res || '' })
    } catch { }
  },
  /**
   * 退出登录
   */
  async LogOut({ state, commit }) {
    commit('anniversary/LOGOUT', null, { root: true })
    if (state.config) {
      // 获取当前账号的配置信息
      const config = JSON.parse(Dense.decrypt(state.config))
      if (config.clear_cache_account == 1) {
        // 获取当前账号信息
        const info = JSON.parse(Dense.decrypt(state.info))
        // 获取当前设备中存储的账号信息
        let users = JSON.parse(Dense.decrypt(state.users))
        users = users.map(item => item.account != info.account)
        Storage.set('users', Dense.encrypt(users))
      }
    }
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
