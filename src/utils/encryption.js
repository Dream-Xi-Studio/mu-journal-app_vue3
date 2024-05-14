/**
 * 参数加密js
 */
import { sha256 } from 'js-sha256'
import { sha512 } from 'js-sha512'
import md5 from 'md5'

/**
 * @method 排序
 * @param {String} str
 */
const ascii = str => {
  let j2 = str['\x73\x70\x6c\x69\x74']("")
  let z$HAU3 = j2['\x73\x6f\x72\x74']()
  return z$HAU3['\x6a\x6f\x69\x6e']("")['\x72\x65\x70\x6c\x61\x63\x65'](/^\s*|\s*$/g, "")
}

/**
 * @method 参数加密算法
 * @param {any} data - 参数
 * @param {Number} time - 时间戳
 * @param {String} sign - 加密的方式
 * @param {Number} write - 大小写
 * @param {String} salt - 盐
 */
export default (data, time, sign, write = 0, salt = '') => {
  let str = JSON.stringify(data) + salt + time
  if (write == 1) {
    str = str.toUpperCase()
  } else if (write == 2) {
    str = str.toLowerCase()
  }
  str = ascii(str)
  switch (sign) {
    case 'sha256':
      str = sha256(str)
      break;
    case 'md5':
      str = md5(str)
      break;
    case 'sha512':
      str = sha512(str)
      break;
  }
  return str
}
