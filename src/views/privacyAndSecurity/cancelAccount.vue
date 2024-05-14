<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { LogoffApply } from '@api/user'
import { showSuccessToast } from 'vant'

// 获取路由对象
const router = useRouter()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
const getUser = computed(() => store.getters.getUser)

// 定义是否阅读并同意信息
const agree = ref(false)
// 倒计时
const countDown = reactive({
  time: 10,
  interval: null
})

/**
 * 确定注销
 */
const confirm = async () => {
  if (getUser.value('info').status == 2) return mui.toast('体验账号不支持改功能')
  if (!agree.value) return mui.toast('请仔细阅读信息并勾选上方按钮后在点击申请')
  try {
    await store.dispatch('server/GetTimestamp', '/user/apply/logoff')
    const res = await LogoffApply({
      data: getApp.value('uuid'),
      time: getServer.value('systemTime'),
      sign: 'sha256',
      salt: 'POpA<!H?n|i;l*1u@hL;%9tF/2>z%.9q'
    })
    showSuccessToast(res)
    store.dispatch('user/LogOut')
    router.replace('/excessive')
  } catch { }
}

onMounted(() => {
  countDown.interval = setInterval(() => {
    if (!countDown.time) {
      clearInterval(countDown.interval)
      return
    }
    countDown.time--
  }, 1000)
})
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="main">
      <div class="title">
        <strong>注销前，请认真阅读以下内容：</strong>
      </div>
      <div class="desc">
        <div>
          注销账号意味着这您将无法再次使用该账号的登入信息登入本软件，该账号在本软件中的所有数据也将直接清零，注销账号的操作将不可逆，请谨慎操作。
        </div>
        <div>
          我们将在15日内完成账号注销。为确保注销的顺利完成，请您在账号注销期间不要使用该账号登录本软件，否则视为您撤销注销该账号申请。
        </div>
      </div>
      <div class="agree">
        <van-checkbox v-model="agree" :disabled="countDown.time != 0" icon-size="18px"
          :checked-color="getApp('primaryColor')">我已阅读并同意以上信息</van-checkbox>
      </div>
      <div class="btn">
        <van-button :color="getApp('primaryColor')" :block="true" :round="true" :disabled="countDown.time != 0"
          :loading="getServer('loading')"
          v-stat="{ type: 2, page: '/privacyAndSecurity/cancelAccount', remarks: '点击确定注销按钮' }" @click.stop="confirm">
          <span v-if="countDown.time"> {{ countDown.time }} S</span>
          <span v-else>确定</span>
        </van-button>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.purple,
.blue,
.yellow {
  position: fixed;
  @include size(136px);
  border-radius: 50%;
  filter: blur(4px);
}

.purple {
  top: calc(var(--app-status-bar) + 180px);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(155px);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(15px);
  background: rgba(255, 245, 227, 1);
}

.main {
  position: relative;
  padding: 0 15px;

  .title {
    padding: 20px 0;
    @include tx(15px);
  }

  .desc {
    @include tx(12px, 18px);
    letter-spacing: 1px;

    >div:last-child {
      margin-top: 8px;
    }
  }

  .agree {
    margin-top: 40px;
    @include flex(center);

    &:deep(.van-checkbox__label) {
      @include tx(12px, 18px);
    }
  }

  .btn {
    margin-top: 15px;
    padding: 0 20px;

    >button {
      --van-button-default-height: 48px;
      --van-button-default-line-height: 48px;
      --van-button-normal-font-size: 16px;
    }
  }
}
</style>
