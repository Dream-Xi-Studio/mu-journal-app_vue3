<script setup>
import { defineAsyncComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { UpdateInfo } from '@api/user'
import { showSuccessToast, showLoadingToast } from 'vant'

const ModifyAvatar = defineAsyncComponent(() => import('./components/ModifyAvatar.vue'))
const ModifyNickname = defineAsyncComponent(() => import('./components/ModifyNickname.vue'))
const ModifyGender = defineAsyncComponent(() => import('./components/ModifyGender.vue'))
const ModifyBirthday = defineAsyncComponent(() => import('./components/ModifyBirthday.vue'))
const AlbumCell = defineAsyncComponent(() => import('./components/AlbumCell.vue'))
const ModifyPersonalizedSignature = defineAsyncComponent(() => import('./components/ModifyPersonalizedSignature.vue'))

// 获取vuex对象
const store = useStore()
const getUser = computed(() => store.getters.getUser)
const getServer = computed(() => store.getters.getServer)
// 用户信息
const info = computed(() => getUser.value('info'))

// 是否显示loading
const loading = ref(null)

/**
 * 修改用户信息
 */
const updateInfo = async params => {
  try {
    loading.value = showLoadingToast({
      forbidClick: true,
      duration: 0
    })
    await store.dispatch('server/GetTimestamp', '/user/info/update')
    const res = await UpdateInfo({
      data: params,
      time: getServer.value('systemTime'),
      sign: 'sha256'
    })
    await store.dispatch('user/GetUserInfo')
    showSuccessToast(res)
  } finally {
    loading.value.close()
  }
}
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <van-cell-group class="main" :border="false">
      <!-- 修改头像 -->
      <Suspense>
        <modify-avatar :item="info" :system-time="getServer('systemTime')"
          :baseURL="getServer('baseURL')"></modify-avatar>

        <template #fallback>
          <Skeleton>
            <div class="paragraph" style="height: 2.4rem;"></div>
          </Skeleton>
        </template>
      </Suspense>

      <!-- 修改昵称 -->
      <Suspense>
        <modify-nickname :item="info" @submit="updateInfo"></modify-nickname>

        <template #fallback>
          <Skeleton>
            <div class="paragraph"></div>
          </Skeleton>
        </template>
      </Suspense>

      <!-- 修改性别 -->
      <Suspense>
        <modify-gender :item="info" @submit="updateInfo"></modify-gender>

        <template #fallback>
          <Skeleton>
            <div class="paragraph"></div>
          </Skeleton>
        </template>
      </Suspense>

      <!-- 修改生日 -->
      <Suspense>
        <modify-birthday :item="info" @submit="updateInfo"></modify-birthday>

        <template #fallback>
          <Skeleton>
            <div class="paragraph"></div>
          </Skeleton>
        </template>
      </Suspense>

      <!-- 我的相册 -->
      <Suspense>
        <album-cell :item="info" :baseURL="getServer('baseURL')"></album-cell>

        <template #fallback>
          <Skeleton>
            <div class="paragraph"></div>
          </Skeleton>
        </template>
      </Suspense>

      <!-- 修改个性签名 -->
      <Suspense>
        <modify-personalized-signature :item="info" @submit="updateInfo"></modify-personalized-signature>

        <template #fallback>
          <Skeleton>
            <div class="paragraph"></div>
          </Skeleton>
        </template>
      </Suspense>
    </van-cell-group>
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
  top: calc(var(--app-status-bar) + 6rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(5.6rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom();
  background: rgba(255, 245, 227, 1);
}

.main {
  --van-cell-group-background: var(--meng-inverse-placeholder);

  .paragraph {
    margin: .48rem .6rem;
    height: .96rem;
    background: var(--van-active-color);
  }

  &:deep(.van-cell) {
    --van-cell-vertical-padding: .48rem;
    --van-cell-horizontal-padding: .6rem;
    --van-cell-background: var(--meng-inverse-placeholder);
    @include tx(.56rem, .8rem);

    .van-cell__value {
      @include omit(1);
    }

    .right {
      @include flex($justify: flex-end);
    }

    .van-cell__right-icon {
      @include tx(.64rem, .96rem);
    }
  }
}
</style>
