import systemConfig from '@/system.config'
import { getUUID, compareVersion } from '@utils/index'

//语言判断
let lang = 'zh'
let l = navigator.appName == 'Netscape' ? navigator.language : navigator.browserLanguage
if (l.indexOf('zh') > -1) {
  lang = 'zh'
} else {
  lang = 'en'
}

const state = {
  // 设备的唯一标识
  uuid: '',
  // 应用的名称
  name: systemConfig.name,
  // 应用的版本名称
  version: systemConfig.version,
  // 应用的版本号
  versionCode: systemConfig.versionCode,
  // 手机系统
  systemName: process.env.NODE_ENV === 'production' ? '' : 'Android',
  // 手机语言信息
  lang,
  // 手机状态栏高度
  height: 0,
  // html的字体大小
  fontSize: 0,
  // 主题色
  primaryColor: systemConfig.primaryColor,
  // 反色
  inverseColor: systemConfig.inverseColor,
  // 更新链接
  upgradeUrl: '',
  // 默认为浏览器
  isPlus: false
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
  /**
   * 设置手机系统
   * @param {String} systemName - 手机系统
   */
  SETSYSTEM_NAME: (state, systemName) => {
    if (state.systemName === systemName) return
    state.systemName = systemName
  },
  /**
   * 设置手机语言信息
   * @param {String} lang - 手机语言信息
   */
  SETLANG: (state, lang) => {
    if (state.lang === lang) return
    localStorage.setItem('lang', lang)
    state.lang = lang
  }
}

const actions = {
  /**
   * 获取设备的唯一标识
   */
  async GETUUID({ commit }) {
    const res = await getUUID()
    commit('SET', { uuid: res || '' })
  },
  /**
   * 设置状态栏文字颜色
   * @param {String} color 可取值："dark"和"light"
   */
  SetStatusBarStyle(color) {
    mui.plusReady(() => {
      plus.navigator.setStatusBarStyle(color)
    })
  },
  /**
   * 升级app
   * @param {*} param0
   * @param {*} params
   */
  UpgradeApp({ state, commit }, params, bool) {
    params = params[state.systemName]
    mui.plusReady(() => {
      if (params && JSON.stringify(params) != '{}') {
        // 判断是否存在忽略版本号
        const version = plus.storage.getItem('updateAbort')
        // 忽略此版本
        if (version && version == params.version) return commit('SET', { upgradeUrl: params.url })
        // 判断是否需要升级
        if (compareVersion(state.version, params.version)) {
          // 提示用户是否升级
          plus.nativeUI.confirm(params.note, i => {
            if (0 == i.index) {
              plus.runtime.openURL(params.url)
            } else if (1 == i.index) {
              plus.storage.setItem('updateAbort', params.version)
              commit('SET', { upgradeUrl: params.url })
            } else {
              commit('SET', { upgradeUrl: params.url })
            }
          }, {
            'title': state.name,
            'buttons': params.compulsion ? ['立即更新'] : ['立即更新', '跳过此版本', '取  消']
          })
        } else {
          bool && mui.toast('已是最新版')
        }
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
