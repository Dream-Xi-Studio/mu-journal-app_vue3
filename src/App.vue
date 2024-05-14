<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { FindThemeById } from '@api/index'

// 获取store对象
const store = useStore()
const getServer = computed(() => store.getters.getServer)
const getUser = computed(() => store.getters.getUser)

// 获取主题信息并设置css主题色
const findThemeById = async () => {
  if (!getUser.value('config')?.themeId) return
  try {
    let res = await FindThemeById(getUser.value('config')?.themeId)
    res = JSON.parse(Dense.decrypt(res))
    store.commit('app/SET', { primaryColor: res.primary, inverseColor: res.inverse })
    const root = document.querySelector(':root')
    root.style.setProperty('--meng-primary-color', res.primary)
    root.style.setProperty('--meng-primary-placeholder', res.primaryPlaceholder)
    root.style.setProperty('--meng-inverse-color', res.inverse)
    root.style.setProperty('--meng-inverse-placeholder', res.inversePlaceholder)
  } catch { }
}

onMounted(async () => {
  // 获取html的字体大小
  const htmlArr = window.getComputedStyle(window.document.documentElement)
  const fontSize = htmlArr['font-size'].replace(/px/g, '')
  store.commit('app/SET', { fontSize })

  // 监听窗口的变化改变程序中默认字体大小
  window.onresize = () => {
    const htmlArr = window.getComputedStyle(window.document.documentElement)
    const fontSize = htmlArr['font-size'].replace(/px/g, '')
    store.commit('app/SET', { fontSize })
  }

  if (getUser.value('info')?.token) {
    if (!getUser.value('config')?.themeId) {
      // 获取用户配置信息
      await store.dispatch('user/GetUserConfig')
    }
    await findThemeById()
  }
})

// 9s后自动检查是否需要更新
setTimeout(() => {
  mui.getJSON(`${getServer.value('baseURL')}/update.json`, res => {
    store.dispatch('app/UpgradeApp', res, false)
  })
}, 9000)

onUnmounted(() => {
  window.onresize = null
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>

<style lang="scss">
@include adapterMixin;
</style>
