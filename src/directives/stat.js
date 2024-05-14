import store from '@store/index'
import { AddBehavior } from '@api/index'

/**
 * 统计
 */
export default {
  mounted(el, { value }) {
    el.$value = value
    el.handler = async () => {
      if (!el.$value) return
      try {
        await AddBehavior({ uuid: store.getters.getApp('uuid'), ...el.$value })
      } catch { }
    }
    // 绑定点击事件
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  updated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el) {
    el.removeEventListener('click', el.handler)
  }
}
