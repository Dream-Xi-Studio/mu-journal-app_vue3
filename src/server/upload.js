import store from '@store/index'
import { getBaseURL } from '@utils/index'
import Error from './error'

/**
 * 上传
 * @param {FormData} param
 */
const fetch = param => {
  // 更改loading的值
  store.commit('server/SET', { loading: true })
  return new Promise((resolve, reject) => {
    mui.ajax(`${getBaseURL()}/api/upload`, {
      type: 'POST',
      timeout: 10000,
      headers: {
        'Authorization': store.getters.getUser('info').token ? `Bearer ${store.getters.getUser('info').token}` : void 0
      },
      data: param,
      processData: false,
      contentType: false,
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
