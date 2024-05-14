import router from '@router/index'
import store from '@store/index'
import { showFailToast } from 'vant'

export default (xhr, type) => {
  // 更改loading的值
  store.commit('server/SET', { loading: false })
  if (type == 'timeout') {
    showFailToast('请求超时')
    return '请求超时'
  } else if (type == 'error') {
    let error = {}
    switch (xhr.status) {
      case 400: {
        error = xhr?.response ? JSON.parse(xhr.response) : {}
        error.message = error.message?.[0] || '参数有误'
        break
      }

      case 401: {
        error.message = '身份验证失败，请重新登录'
        store.dispatch('user/LogOut')
        router.replace('/excessive')
        break
      }

      default: {
        try {
          error = xhr?.response ? JSON.parse(xhr.response) : {}
        } catch {
          error.message = '网络错误'
        }
        break
      }
    }
    showFailToast(error.message || xhr.statusText)
    return error.message || xhr.statusText
  }
}
