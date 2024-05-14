<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { UpdatePassword } from '@api/user'
import { showSuccessToast } from 'vant'
import { AddBehavior } from '@api/index'

const router = useRouter()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)

// 控制密码框显示
const controlPassword = reactive({
  type1: 'password',
  type2: 'password'
})
// 参数
const params = reactive({
  originalPassword: '',
  newPassword: '',
  confirmPassword: ''
})

/**
 * 切换密码框的显示
 */
const switchPassword = type => {
  if (controlPassword[type] == 'password') {
    controlPassword[type] = 'text'
  } else {
    controlPassword[type] = 'password'
  }
}

/**
 * 提交
 */
const submit = async () => {
  try {
    await AddBehavior({
      uuid: getApp.value('uuid'),
      type: 2,
      page: '/privacyAndSecurity/updatePassword',
      remarks: '点击修改密码'
    })
  } catch { }
  if (!params.originalPassword) return mui.toast('请输入原密码')
  if (!params.newPassword) {
    return mui.toast('请输入新密码')
  } else if (params.newPassword.length < 6 || params.newPassword.length > 20) {
    return mui.toast('密码长度为6~20位')
  }
  if (!params.confirmPassword) {
    return mui.toast('请输入原密码')
  } else if (params.confirmPassword !== params.newPassword) {
    return mui.toast('两次密码输入不一致')
  }
  try {
    await store.dispatch('server/GetTimestamp', '/user/password/update')
    const res = await UpdatePassword({
      data: {
        originalPassword: Dense.encrypt(params.originalPassword),
        newPassword: Dense.encrypt(params.newPassword),
        confirmPassword: Dense.encrypt(params.confirmPassword)
      },
      time: getServer.value('systemTime'),
      sign: 'sha256',
      salt: ')4ZY)uY6e^6!VmZJ%@UA[6}?&>xLC]et'
    })
    showSuccessToast(res)
    store.dispatch('user/LogOut')
    router.push('/login')
  } catch { }
}
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="frm">
      <!-- 原密码 -->
      <van-field v-model="params.originalPassword" label="原密码" maxlength="20" placeholder="请输入原密码" :border="false"
        @keyup.enter="submit" />

      <!-- 新密码 -->
      <van-field v-model="params.newPassword" label="新密码" :type="controlPassword.type1" maxlength="20"
        placeholder="请输入新密码" :border="false" :right-icon="controlPassword.type1 == 'password' ? 'closed-eye' : 'eye-o'"
        @click-right-icon="switchPassword('type1')" @keyup.enter="submit" />

      <!-- 确认密码 -->
      <van-field v-model="params.confirmPassword" label="确认密码" :type="controlPassword.type2" maxlength="20"
        placeholder="请输入确认密码" :border="false" :right-icon="controlPassword.type2 == 'password' ? 'closed-eye' : 'eye-o'"
        @click-right-icon="switchPassword('type2')" @keyup.enter="submit" />

      <van-button text="确定" :color="getApp('primaryColor')" :block="true" :round="true" :loading="getServer('loading')"
        @click.stop="submit"></van-button>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.purple,
.blue,
.yellow {
  position: fixed;
  @include size(5.44rem);
  border-radius: 50%;
  filter: blur(0.16rem);
}

.purple {
  top: calc(var(--app-status-bar) + 7rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(6rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.4rem);
  background: rgba(255, 245, 227, 1);
}

.frm {
  position: relative;
  padding: 0 .6rem;

  &:deep(.van-cell) {
    --van-cell-vertical-padding: .56rem;
    --van-cell-horizontal-padding: .6rem;
    --van-cell-font-size: .56rem;
    --van-cell-line-height: .8rem;
    --van-field-label-color: rgba(51, 51, 51, 1);
    --van-cell-background: var(--meng-inverse-placeholder);
    margin: 1.2rem 0;
    border-radius: .16rem;
  }

  >button {
    margin-top: 3.2rem;
    --van-button-default-height: 1.92rem;
    --van-button-default-line-height: 1.92rem;
    --van-button-normal-font-size: .64rem;
  }
}
</style>
