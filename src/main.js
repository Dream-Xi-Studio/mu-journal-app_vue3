import { createApp } from 'vue'

import 'normalize.css/normalize.css'
import '@styles/index.scss'
import '@styles/form.scss'
import './assets/iconfont/iconfont.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/image-preview/style'

import App from './App.vue'
const app = createApp(App)

import store from './store'
app.use(store)

// 获取手机的设备唯一标识
store.dispatch('app/GETUUID')

import router from './router'
import './permission'
app.use(router)

import i18n, { loadLanguageAsync } from './i18n'
app.use(i18n)

import { getLanguage, getModule } from '@utils/index'

// 获取手机的一些信息
mui.plusReady(() => {
  // 设置当前运行环境为手机
  store.commit('app/SET', { isPlus: true })
  // 获取app是否为沉浸式状态栏模式
  let isY = plus.navigator.isImmersedStatusbar()
  if (isY) {
    // 获取状态栏高度
    let height = plus.navigator.getStatusbarHeight()
    store.commit('app/SET', { height })
  }
  // 获取app的信息
  plus.runtime.getProperty(plus.runtime.appid/* 应用的Appid */, appinfo => {
    store.commit('app/SET', {
      // 应用的名称
      name: appinfo.name,
      // 应用的版本名称
      version: appinfo.version,
      // 应用的版本号
      versionCode: appinfo.versionCode
    })
  })
  // 获取系统的名称
  const systemName = plus.os.name
  // 保存系统的名称
  store.commit('app/SETSYSTEM_NAME', systemName == 'iOS' ? 'iOS' : 'Android')
  // 设置手机的语言信息
  loadLanguageAsync(getLanguage())
  // 隐藏滚动条
  plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' })
})

// 获取directives文件夹下的所有的指令
const directives = getModule(require.context('./directives', true, /\.js$/))
// 循环导入app中
for (const key in directives) {
  app.directive(key, directives[key])
}

app.mount('#app')
