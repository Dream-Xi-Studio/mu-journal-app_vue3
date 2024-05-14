<script setup>
import { defineAsyncComponent, computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { AddBehavior } from '@api/index'
import { Register } from '@api/user'
import { showSuccessToast } from 'vant'

const Layout = defineAsyncComponent(() => import('./components/Layout.vue'))
const Field = defineAsyncComponent(() => import('./components/Filed.vue'))

// 获取路由对象
const router = useRouter()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
// 参数对象
const params = reactive({
  account: '',
  password: '',
  referCode: void 0,
  checked: false
})
// 确认密码
const password = ref('')

/**
 * 注册事件
 */
const register = async () => {
  await AddBehavior({
    uuid: getApp.value('uuid'),
    type: 2,
    page: '/register',
    remarks: '点击注册按钮'
  })
  if (!params.account) {
    return mui.toast('请输入手机号')
  } else if (!/^1[3-9]\d{9}$/.test(params.account)) {
    return mui.toast('手机号码格式有误')
  }
  if (!params.password) {
    return mui.toast('请输入密码')
  } else if (params.password.length < 6 || params.password.length > 20) {
    return mui.toast('密码长度为6~20位')
  }
  if (!password.value) {
    return mui.toast('请输入确认密码')
  } else if (password.value !== params.password) {
    return mui.toast('两次密码输入不一致')
  }
  if (params.referCode && params.referCode.length != 6) {
    return mui.toast('邀请码长度为6位')
  }
  if (!params.checked) {
    return mui.toast('请勾选同意后在注册')
  }
  await store.dispatch('server/GetSystemTime')
  try {
    const res = await Register({
      data: {
        ...params,
        referCode: params.referCode ? params.referCode : void 0
      },
      time: getServer.value('systemTime'),
      sign: 'md5'
    })
    showSuccessToast(res)
    router.replace(`/login?account=${params.account}`)
  } catch { }
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
      <div class="frm" style="padding-bottom: 1.2rem;">
        <div class="title">{{ `欢迎注册${getApp('name')}` }}</div>
        <!-- 手机号 -->
        <Field v-model="params.account" type="tel" label="手机号" placeholder="请输入手机号" :maxlength="11" :clearable="true"
          style="margin-top: .8rem;" @keyup.enter="register">
        </Field>

        <!-- 密码 -->
        <Field v-model="params.password" type="password" label="密码" placeholder="请输入密码" :maxlength="20"
          :password-icon="true" style="margin-top: .48rem;" @keyup.enter="register">
        </Field>

        <!-- 确认密码 -->
        <Field v-model="password" type="password" label="确认密码" placeholder="请输入确认密码" :maxlength="20" :password-icon="true"
          style="margin-top: .48rem;" @keyup.enter="register">
        </Field>

        <!-- 邀请码 -->
        <Field v-model="params.referCode" label="邀请码" placeholder="请输入邀请码" :maxlength="6" :clearable="true"
          style="margin-top: .48rem;" @keyup.enter="register">
        </Field>

        <!-- 协议 -->
        <div class="tips" style="margin: 1.44rem 0 .32rem;">
          <van-checkbox v-model="params.checked" icon-size=".64rem">
            <span>阅读并同意</span>
            <a v-stat="{ type: 4, page: '/register', remarks: '查看《用户协议》' }"
              @click.stop="$router.push('/about/service')">《用户协议》</a>
            <span>和</span>
            <a v-stat="{ type: 4, page: '/register', remarks: '查看《隐私政策》' }"
              @click.stop="$router.push('/about/privacy')">《隐私政策》</a>
          </van-checkbox>
        </div>
        <van-button text="注册" :color="getApp('primaryColor')" :loading="getServer('loading')" :block="true" :round="true"
          loading-text="加载中..." @click.stop="register"></van-button>
        <div class="btns" style="margin-top: .64rem;">
          <code>
                <span>已有账号？</span>
                <div class="btn" v-stat="{ type: 3, page: '/register', remarks: '跳转到登录' }" @click.stop="$router.replace('/login')">去登录</div>
              </code>
        </div>
      </div>
    </div>
  </Layout>
</template>
