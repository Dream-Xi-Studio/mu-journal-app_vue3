<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { SetUserConfig } from '@api/user'
import { showSuccessToast } from 'vant'
import { AddBehavior } from '@api/index'

const router = useRouter()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
const getUser = computed(() => store.getters.getUser)

/**
 * 事件回调函数
 */
const updateClearCacheAccount = async value => {
  if (getUser.value('info').status == 2) return mui.toast('体验账号不支持改功能')
  try {
    await AddBehavior({
      uuid: getApp.value('uuid'),
      type: 2,
      page: '/privacyAndSecurity',
      remarks: value == 1 ? '退登后清除账号密码信息' : '退登后不清除账号密码信息'
    })
  } catch { }
  try {
    await store.dispatch('server/GetTimestamp', '/user/config/update')
    const res = await SetUserConfig({
      data: {
        name: 'clearCacheAccount',
        value
      },
      time: getServer.value('systemTime'),
      sign: 'sha512'
    })
    await store.dispatch('user/GetUserConfig')
    showSuccessToast(res)
  } catch { }
}

/**
 * 去修改密码
 */
const toUpdatePassword = () => {
  if (getUser.value('info').status == 2) return mui.toast('体验账号不支持改功能')
  router.push('/privacyAndSecurity/updatePassword')
}
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="main">
      <div class="logout">
        <van-cell title="退登后清除账号密码信息" :border="false" center>
          <template #value>
            <div class="switch">
              <van-switch :model-value="getUser('config').clearCacheAccount" size="0.72rem"
                :active-color="getApp('primaryColor')" :active-value="1" :inactive-value="2"
                @update:model-value="updateClearCacheAccount" />
            </div>
          </template>
        </van-cell>
        <div class="tips">开启后，退出登录你的登录账号和密码信息将被清除，如果是账号切换中绑定的账号密码也将被清除</div>
      </div>

      <van-cell-group :border="false">
        <van-cell title="修改密码" is-link center v-stat="{ type: 3, page: '/privacyAndSecurity', remarks: '跳转到修改密码页面' }"
          @click.stop="toUpdatePassword"></van-cell>

        <van-cell title="注销账号" to="/privacyAndSecurity/cancelAccount" is-link center
          v-stat="{ type: 3, page: '/privacyAndSecurity', remarks: '跳转到注销账号页面' }"></van-cell>
      </van-cell-group>
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
  top: calc(var(--app-status-bar) + 6.8rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(5.8rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.2rem);
  background: rgba(255, 245, 227, 1);
}

.main {
  position: relative;

  &:deep(.van-cell) {
    --van-cell-vertical-padding: .48rem;
    --van-cell-horizontal-padding: .6rem;
    --van-cell-font-size: .56rem;
    --van-cell-background: var(--meng-inverse-placeholder);

    .switch {
      height: 100%;
      @include flex(flex-end, center);
    }
  }

  .logout .tips {
    position: relative;
    margin: .32rem 0 .8rem;
    padding: 0 .6rem;
    @include tx(.48rem, .72rem);
    color: #909399;
  }

  &:deep(.van-cell-group) {
    --van-cell-group-background: var(--meng-inverse-placeholder);
  }
}
</style>
