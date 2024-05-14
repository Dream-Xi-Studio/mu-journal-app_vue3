import { FindRepeatAll, FindReminderAll } from '@api/anniversary'
import { FindThemeAll } from '@api'

const state = {
  // 重复字典列表
  repeatList: sessionStorage.getItem('repeatList') || '',
  // 提醒数组的配置
  reminderList: sessionStorage.getItem('reminderList') || '',
  // 主题数组
  themeList: sessionStorage.getItem('themeList') || ''
}

const mutations = {
  /**
   * 修改state中的值
   * @param {Object} state - vuex的state对象
   * @param {Object} params - 参数
   */
  SET: (state, params) => {
    const keys = Object.keys(params)
    keys.forEach(key => {
      state[key] = params[key]
    })
  },
}

const actions = {
  /**
   * 获取重复字典列表
   */
  async FindRepeatAll({ commit }) {
    try {
      const res = await FindRepeatAll()
      commit('SET', { repeatList: res || '' })
    } catch { }
  },
  /**
   * 获取提醒字典列表
   */
  async FindReminderAll({ commit }) {
    try {
      const res = await FindReminderAll()
      commit('SET', { reminderList: res || '' })
    } catch { }
  },
  /**
   * 获取系统主题数据
   */
  async FindThemeAll({ commit }) {
    try {
      const res = await FindThemeAll()
      commit('SET', { themeList: res || '' })
    } catch { }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
