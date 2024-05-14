<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showConfirmDialog, showSuccessToast } from 'vant'
import { TemporaryLogin } from '@api/user'

// 获取全局路由对象
const router = useRouter()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)

const Layout = defineAsyncComponent(() => import('./components/Layout.vue'))

/**
 * 游客登录
 */
const visitorLogin = async () => {
  showConfirmDialog({
    title: '提示',
    message: '本次登入为游客登入，无法体验完整的功能，请确认是否继续以游客模式进行登入？',
    className: 'confirm_dialog',
    confirmButtonColor: getApp.value('primaryColor'),
    closeOnClickOverlay: true
  })
    .then(async () => {
      try {
        await store.dispatch('server/GetSystemTime')
        const res = await TemporaryLogin({
          data: getApp.value('uuid'),
          time: getServer.value('systemTime'),
          sign: 'sha512'
        })
        showSuccessToast('登录成功')
        Storage.set('user_id', JSON.parse(Dense.decrypt(res)).id)
        store.commit('user/SET', { info: res })
        await store.dispatch('user/GetUserConfig')
        router.replace('/home')
      } catch { }
    })
    .catch(() => { })
}
</script>

<template>
  <Layout>
    <div class="main" style="height: max(16rem, 100%)">
      <div class="box">
        <div class="logo">
          <img src="@assets/images/logo.png" alt="logo" loading="lazy" />
        </div>
        <div class="name">{{ getApp('name') }}</div>
        <div class="btn btn1">
          <van-button text="账号登录" :color="getApp('primaryColor')" :block="true" :round="true"
            v-stat="{ type: 3, page: '/excessive', remarks: '跳转到登录' }" @click.stop="$router.push('/login')">
          </van-button>
        </div>
        <div class="btn btn2">
          <van-button text="游客登录" :color="getApp('primaryColor')" :block="true" :plain="true" :round="true"
            v-stat="{ type: 2, page: '/excessive', remarks: '点击游客登录按钮' }" @click="visitorLogin">
          </van-button>
        </div>
        <div class="tips">
          <span>未有账号？</span>
          <span v-stat="{ type: 3, page: '/excessive', remarks: '跳转到注册' }"
            @click.stop="$router.push('/register')">去注册</span>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.main {
  @include center(flex);

  .box {
    position: relative;
    padding: 0 1.92rem;
    width: 100%;

    .logo {
      @include flex(center);

      >img {
        width: 2.52rem;
      }
    }

    .name {
      margin-top: .68rem;
      @include tx(.8rem, 1.2rem);
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #707070;
      text-align: center;
    }

    .btn>button {
      --van-button-default-height: 1.92rem;
      --van-button-default-line-height: 1.92rem;
      --van-button-normal-font-size: .64rem;

      &:deep(span) {
        @include tx(.64rem, .88rem);
      }
    }

    .btn1 {
      margin-top: 2.52rem;
    }

    .btn2 {
      margin-top: 1.2rem;

      &:deep(.van-button--plain) {
        --van-button-plain-background-color: transparent;
      }

      >button:enabled:active {
        background-color: rgba($color: #929292, $alpha: .02)
      }
    }

    .tips {
      margin-top: 2.2rem;
      @include tx(.56rem, .84rem);
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #707070;
      text-align: center;

      >span:last-child {
        color: var(--meng-primary-color);
      }
    }
  }
}
</style>
