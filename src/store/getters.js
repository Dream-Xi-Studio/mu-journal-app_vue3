const getters = {
  // 获取anniversary模块中的信息
  getAnniversary: state => key => {
    if (key === 'categoryList') {
      if (!state.anniversary[key]) return []
      return JSON.parse(Dense.decrypt(state.anniversary[key]))
    } else if (key) {
      return state.anniversary[key]
    } else {
      return ''
    }
  },
  // 获取app模块中的信息
  getApp: state => key => {
    if (key) {
      return state.app[key]
    } else {
      return ''
    }
  },
  // 获取server模块中的信息
  getServer: state => key => {
    if (key) {
      return state.server[key]
    } else {
      return ''
    }
  },
  // 获取system模块中的信息
  getSystem: state => key => {
    if (['repeatList', 'reminderList', 'themeList'].includes(key)) {
      if (!state.system[key]) return []
      return JSON.parse(Dense.decrypt(state.system[key]))
    } else if (key) {
      return state.system[key]
    } else {
      return ''
    }
  },
  // 获取user模块中的信息
  getUser: state => key => {
    if (key == 'users') {
      if (!state.user[key]) return []
      return JSON.parse(Dense.decrypt(state.user[key]))
    } else if (['info', 'config'].includes(key)) {
      if (!state.user[key]) return {}
      return JSON.parse(Dense.decrypt(state.user[key]))
    } else if (key) {
      return state.user[key]
    } else {
      return ''
    }
  }
}

export default getters
