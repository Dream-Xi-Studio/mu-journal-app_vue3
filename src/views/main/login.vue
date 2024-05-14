<script setup>
import { defineAsyncComponent, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { AddBehavior } from '@api/index'
import { Login } from '@api/user'
import { showSuccessToast } from 'vant'

const Layout = defineAsyncComponent(() => import('./components/Layout.vue'))
const Field = defineAsyncComponent(() => import('./components/Filed.vue'))

// 获取全局路由对象
const router = useRouter()
// 获取当前路由对象
const route = useRoute()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
const getUser = computed(() => store.getters.getUser)
// 获取缓存中的用户信息
const user = computed(() => {
  const user = getUser.value('users')?.[0] || {}
  if (!Object.keys(user)?.length) return
  return {
    account: user.account,
    password: Dense.decrypt(user.password)
  }
})

// 参数对象
const params = reactive(user.value || {
  account: route.query.account || '',
  password: ''
})

// 登录事件
const login = async () => {
  try {
    await AddBehavior({
      uuid: getApp.value('uuid'),
      type: 2,
      page: '/login',
      remarks: '点击登录按钮'
    })
  } catch { }
  if (!params.account) return mui.toast('请输入账号')
  if (!params.password) return mui.toast('请输入密码')
  try {
    const data = {
      account: params.account,
      password: Dense.encrypt(params.password)
    }
    await store.dispatch('server/GetSystemTime')
    const res = await Login({
      data: {
        ...data,
        uuid: getApp.value('uuid')
      },
      time: getServer.value('systemTime'),
      sign: 'sha256'
    })
    showSuccessToast('登录成功')
    Storage.set('user_id', JSON.parse(Dense.decrypt(res)).id)
    store.commit('user/SET', { info: res })
    await store.dispatch('user/GetUserInfo')
    // 添加账号到缓存
    store.dispatch('user/AddUser', {
      ...data,
      nickname: getUser.value('info').nickname,
      image: getUser.value('info').avatar?.status == 1 ? getUser.value('info').avatar?.image : ''
    })
    router.replace('/home')
  } catch { }
}

const forget = () => {
  mui.toast('暂无开放，如需找回密码请联系客服')
}
</script>

<template>
  <Layout>
    <div class="main">
      <div class="info">
        <div class="logo">
          <img src="@assets/images/logo.png" alt="logo" loading="lazy" />
        </div>
        <div class="name">{{ getApp('name') }}</div>
      </div>
      <div class="frm">
        <div class="title">{{ `欢迎登录${getApp('name')}` }}</div>
        <!-- 手机号 -->
        <Field v-model="params.account" type="tel" label="手机号" placeholder="请输入手机号" :clearable="true"
          style="margin-top: 1.6rem;" @keyup.enter="login">
        </Field>

        <!-- 密码 -->
        <Field v-model="params.password" type="password" label="密码" placeholder="请输入密码" :password-icon="true"
          style="margin-top: .8rem;" @keyup.enter="login">
        </Field>
        <div class="tips">
          <span v-stat="{ type: 3, page: '/login', remarks: '跳转到忘记密码' }" @click.stop="forget">忘记密码？</span>
        </div>
        <van-button text="登录" :color="getApp('primaryColor')" :loading="getServer('loading')" :block="true" :round="true"
          loading-text="加载中..." @click.stop="login"></van-button>
        <div class="btns">
          <code>
                <div class="btn" v-stat="{ type: 3, page: '/login', remarks: '跳转到联系客服' }" @click.stop="$router.push('/me/customerService')">联系客服</div>

                <div class="btn">|</div>

                <div class="btn" v-stat="{ type: 3, page: '/login', remarks: '跳转到注册' }" @click.stop="$router.replace('/register')">去注册？</div>
              </code>
        </div>
      </div>
    </div>
  </Layout>
</template>
