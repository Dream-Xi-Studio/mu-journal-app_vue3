/**
 * 工具类
 */
import CryptoJS from 'crypto-js'
import systemConfig from '@/system.config'

const k = systemConfig.key
const iv = CryptoJS.enc.Utf8.parse(systemConfig.iv)

const Dense = {
  // 加密
  encrypt: (text, key = k) => {
    if (typeof text != 'string') {
      text = JSON.stringify(text)
    }
    const str = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString()
    return str
  },
  // 解密
  decrypt: (text, key = k) => {
    var result = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return result.toString(CryptoJS.enc.Utf8)
  }
}

export default Dense
