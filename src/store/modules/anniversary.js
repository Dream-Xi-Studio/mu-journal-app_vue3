import { FindCategoryAll } from '@api/category'

/**
 * @method 给key值添加前缀
 * @param {String} key
 */
const addPrefix = (key) => {
  return `${Storage.get('user_id')}_anniversary-${key}`
}

const state = {
  // 分类列表
  categoryList: Storage.get(addPrefix('categoryList')) || '',
  // 首页当前选中的分类id
  category_id: Storage.get(addPrefix('category_id')) || 0
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
      Storage.set(addPrefix(key), params[key])
    })
  },
  /**
   * @method 退出登录
   */
  LOGOUT: state => {
    state.categoryList = ''
    state.category_id = 0
  }
}

const actions = {
  /**
   * 获取纪念日分类
   */
  async FindCategoryAll({ commit }) {
    try {
      const res = await FindCategoryAll()
      commit('SET', { categoryList: res || '' })
    } catch { }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
