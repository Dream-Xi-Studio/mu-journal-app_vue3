import store from '@store/index'
import { getBaseURL } from '@utils/index'
import encryption from '@utils/encryption'
import Error from './error'

/**
 * 基于mui的ajax
 * @param {object} config - 参数对象
 * @param {String} config.url - 请求发送的目标地址
 * @param {'POST'|'GET'} config.method - 请求方式
 * @param {any} config.data - 发送到服务器的业务数据
 */
const fetch = config => {
  // 更改loading的值
  store.commit('server/SET', { loading: true })
  let { url, method = 'GET', params } = config
  if (params?.time) params = {
    data: params.data,
    pagination: params.pages ? params.pages : void 0,
    m: params.time,
    s: encryption(params.data, params.time, params.sign, params.write, params.salt)
  }
  return new Promise((resolve, reject) => {
    mui.ajax(`${getBaseURL()}/api${url}`, {
      type: method,
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': store.getters.getUser('info').token ? `Bearer ${store.getters.getUser('info').token}` : void 0
      },
      data: params,
      success: res => {
        // 更改loading的值
        store.commit('server/SET', { loading: false })
        resolve(res)
      },
      error: (xhr, type) => {
        const res = Error(xhr, type)
        if (res) {
          reject(res)
        }
      }
    })
  })
}

export default fetch
