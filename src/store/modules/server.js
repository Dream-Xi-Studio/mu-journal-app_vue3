import { GetCurrentTime, GetCurrentTimestamp } from '@api/index'
import { getBaseURL } from '@utils/index'

const state = {
  // 请求地址头
  baseURL: getBaseURL() || process.env.VUE_APP_DEV_BASEURL,
  // 按钮是否可点
  loading: false,
  // 系统时间
  systemTime: ''
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
  }
}

const actions = {
  /**
   * 获取系统时间戳
   */
  async GetSystemTime({ commit }) {
    let res
    try {
      res = await GetCurrentTime()
      if (!res) res = ''
    } catch {
      res = ''
    }
    commit('SET', { systemTime: res })
  },
  /**
   * 获取系统时间戳
   */
  async GetTimestamp({ commit }, url) {
    let res
    try {
      res = await GetCurrentTimestamp({
        url: Dense.encrypt(`/api${url}`)
      })
    } catch {
      res = ''
    }
    commit('SET', { systemTime: res })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
