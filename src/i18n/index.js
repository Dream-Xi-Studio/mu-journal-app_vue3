import { createI18n } from 'vue-i18n'
import store from '@store/index'

// 从store里面获取默认语言
const lang = store.state.app.lang

const i18n = createI18n({
  locale: lang,
  fallbackLocale: lang,
  messages: {
    [lang]: require(`./${lang}.js`).default
  }
})

// 我们的预装默认语言
const loadedLanguages = [lang]

/**
 * @method 修改语言环境
 * @param {String} lang - 语言
 * @returns {String}
 */
const setI18nLanguage = lang => {
  // 修改i18n当前语言环境
  if (i18n.mode === 'legacy') {
    i18n.global.locale = lang
  } else {
    i18n.global.locale.value = lang
  }
  store.commit('app/SETLANG', lang)
  return lang
}

/**
 * @method 懒加载语言环境
 * @param {String} lang - 需要加载的语言环境
 */
export const loadLanguageAsync = async lang => {
  // 如果语言相同
  if (i18n.mode === 'legacy' && i18n.global.locale === lang || i18n.global.locale.value === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果尚未加载语言
  const messages = await import(`@i18n/${lang}.js`)
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export default i18n
