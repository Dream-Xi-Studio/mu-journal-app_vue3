/**
 * key前缀
 * @type {String}
 */
const keyPrefix = 'mu-journal'

/**
 * 给key值添加前缀
 * @param {String} key
 */
const addPrefix = (key) => {
  return `${keyPrefix}_${key}`
}

/**
 * 是否过期
 * @param {Object} valObj
 * @param {Number} valObj.time - 存入时间
 * @param {Number} valObj.expires - 有效时间
 */
const isFresh = (valObj) => {
  const now = new Date().getTime()
  return valObj.time + valObj.expires >= now
}

/**
 * 封装数据存储对象
 */
const Storage = {
  /**
   * 存储键值
   * @param {String} key
   * @param {any} value - 内容
   * @param {Number} expires - 有效时间
   */
  set: (key, value, expires) => {
    if (!key) return
    key = addPrefix(key)
    if (expires) {
      value = JSON.stringify({
        value,
        time: new Date().getTime(),
        expires
      })
    } else {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  },

  /**
   * 获取存储的键值
   * @param {String} key
   */
  get: key => {
    if (!key) return
    key = addPrefix(key)
    const item = JSON.parse(localStorage.getItem(key))
    if (item && item.time) {
      if (isFresh(item)) {
        return item.value
      }
      localStorage.removeItem(key)
      return
    }
    return item
  },

  /**
   * 删除键值
   * @param {String}
   */
  remove: key => {
    if (!key) return
    key = addPrefix(key)
    localStorage.removeItem(key)
  },

  /**
   * 清除存储数据
   */
  clear: () => {
    localStorage.clear()
  },

  /**
   * 根据key清除存储数据
   * @param {String} key
   */
  clearKey: key => {
    if (!key) return
    key = addPrefix(key)
    const arr = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)).filter((str) => str?.startsWith(key))
    arr.forEach((str) => localStorage.removeItem(str))
  }
}

export default Storage
