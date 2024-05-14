import FingerprintJS from '@fingerprintjs/fingerprintjs'

/**
 * 获取指定目录下所有的文件返回一个对象
 * @param {Array} files 指定目录下所有文件的对象
 * @returns {Object[]}
 */
export const getModule = files => {
  if (!files) return
  return files.keys().reduce((modules, modulePath) => {
    // 获取名字
    const name = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[0]
    // 获取配置
    const value = files(modulePath)
    modules[name] = value.default || value
    return modules
  }, {})
}

/**
 * 获取请求头地址
 * @returns {String}
 */
export const getBaseURL = () => {
  let baseURL = ''
  // 判断是否为production模式
  if (process.env.NODE_ENV === 'production') {
    // 判断是否为测试打包，是则读取测试环境url地址，反之读取正式环境url地址
    baseURL = process.env.VUE_APP_ENV === 'test' ? process.env.VUE_APP_TEST_BASEURL : process.env.VUE_APP_PROD_BASEURL
  }
  return baseURL
}

/**
 * 获取系统语言信息
 * @returns {String}
 */
export const getLanguage = () => {
  // 系统语言信息
  let systemLanguage = plus.os.language
  // 安卓苹果系统可能存在的中文语言值
  const zhList = ['zh', 'zh-Hans', 'zh-Hans-CN', 'zh-Hans-HK', 'zh-Hans-MO', 'zh-Hans-SG', 'zh-CN', 'zh_CN']
  if (zhList.includes(systemLanguage)) {
    systemLanguage = 'zh'
  } else {
    // 安卓苹果系统可能存在的中文繁体语言值
    const twList = ['zh-TW', 'zh-Hant', 'zh-Hant-TW', 'zh-Hant-MO', 'zh-Hant-HK', 'zh_TW']
    if (twList.includes(systemLanguage)) {
      systemLanguage = 'zh-tw'
    } else {
      systemLanguage = 'en'
    }
  }
  return systemLanguage
}

/**
 * 获取设备的唯一标识
 */
export const getUUID = async () => {
  return new Promise((resolve, reject) => {
    if (window?.plus) {
      mui.plusReady(() => {
        plus.device.getInfo({
          success: e => {
            resolve(e.uuid)
          },
          fail: e => {
            reject(e)
          }
        })
      })
    } else {
      const fpPromise = FingerprintJS.load()
        ; (async () => {
          const fp = await fpPromise
          const result = await fp.get()
          resolve(result.visitorId)
        })()
    }
  })
}

/**
 * 比较版本大小
 * @param {String} ov 旧版本
 * @param {String} nv 新版本
 * @return {Boolean} 新版本nv大于旧版本ov则返回true，否则返回false
 */
export const compareVersion = (ov, nv) => {
  if (!ov || !nv || ov == '' || nv == '') return false
  const ova = ov.split('.', 4)
  const nva = nv.split('.', 4)
  for (let i = 0; i < ova.length && i < nva.length; i++) {
    var so = ova[i], no = parseInt(so), sn = nva[i], nn = parseInt(sn)
    if (nn > no || sn.length > so.length) {
      return true
    } else if (nn < no) {
      return false
    }
  }
  if (nva.length > ova.length && 0 == nv.indexOf(ov)) return true
}

/**
 * 天时分秒计算
 * @param {Number} s - 秒
 * @returns {Object}
 */
export const getTime = s => {
  let day = Math.floor(s / (24 * 3600))
  let hour = Math.floor((s - day * 24 * 3600) / 3600)
  let minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60)
  let second = s - day * 24 * 3600 - hour * 3600 - minute * 60
  return { day, hour, minute, second }
}

/**
 * 修改颜色透明度
 * @param {string} color - 颜色对象
 * @param {string|Number} alpha - 数字 0-1 或百分比 0-100%
 */
export const colorFade = (color, alpha) => {
  let theColor = color.toLowerCase()
  // 十六进制颜色值的正则表达式
  var r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (theColor && r.test(theColor)) {
    if (theColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1))
      }
      theColor = sColorNew
    }
    //处理六位的颜色值
    let sColorChange = []
    for (let j = 1; j < 7; j += 2) {
      sColorChange.push(parseInt('0x' + theColor.slice(j, j + 2)))
    }
    theColor = 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  }
  // 如果是rgba或者rgb
  if (theColor.startsWith('rgb')) {
    let numbers = theColor.match(/(\d(\.\d+)?)+/g)
    numbers = numbers.slice(0, 3).concat(alpha)
    theColor = 'rgba(' + numbers.join(',') + ')'
  }
  return theColor
}

/**
 * 获取1900距现在+num年的所有日期对象数组 - 阳历
 * @param {Number} num
 */
export const getSolarCalendar = async num => {
  const years = []
  for (let i = 1900; i <= dayjs().add(num, 'y').year(); i++) {
    const months = []
    // 默认12个月
    let monthsLength = 12
    if (i == dayjs().year() && num == 0) monthsLength = dayjs().month() + 1

    for (let j = 1; j <= monthsLength; j++) {
      const days = []
      // 默认当月的所有天数
      let daysLength = dayjs([i, j]).daysInMonth()
      if (j == dayjs().month() + 1 && num == 0) daysLength = dayjs().date()

      for (let d = 1; d <= daysLength; d++) {
        days.push({
          text: d < 10 ? '0' + d + '日' : d + '日',
          value: d
        })
      }
      months.push({
        text: j < 10 ? '0' + j + '月' : j + '月',
        value: j,
        children: days
      })
    }
    years.push({
      text: i < 10 ? '0' + i + '年' : i + '年',
      value: i,
      children: months
    })
  }
  return Promise.resolve(years)
}

/**
 * 获取1900距现在+30年的所有日期对象数组 - 农历
 * @param {Number} num
 */
export const getLunarCalendar = async num => {
  const years = []
  for (let i = 1900; i <= dayjs().add(num, 'y').year(); i++) {
    // 农历月份天数数组
    const lunarMonths = Calendar.lunarMonths(i)
    // 农历闰月
    const leapMonth = Calendar.leapMonth(i)
    const months = []
    for (let j = 0; j < lunarMonths.length; j++) {
      const days = []
      for (let d = 1; d <= lunarMonths[j]; d++) {
        days.push({
          text: Calendar.chineseNumber(d),
          value: d
        })
      }
      let text = Calendar.chineseMonth(j + 1)
      let value = j + 1
      if (leapMonth && j === leapMonth) {
        text = '润' + Calendar.chineseMonth(j)
        value = leapMonth + 1
      }
      if (leapMonth && leapMonth < j) {
        text = Calendar.chineseMonth(j)
        value = j
      }
      months.push({
        text: text,
        value: value,
        children: days
      })
    }
    years.push({
      text: Calendar.lunarYear(i) + '年(' + i + ')',
      value: i,
      children: months
    })
  }
  return Promise.resolve(years)
}
