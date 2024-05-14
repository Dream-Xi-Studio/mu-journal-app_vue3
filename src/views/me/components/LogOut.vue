<script setup>
import { ref } from 'vue'

defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})

defineEmits(['logOut'])

// 定义是否显示退出弹层
const show = ref(false)

// 关闭app
const closeApp = () => {
  mui.plusReady(() => {
    plus.runtime.quit()
  })
}
</script>

<template>
  <van-cell title="退出" is-link center v-stat="{ type: 8, page: '/home/me', remarks: '点击退出按钮' }" @click.stop="show = true">
    <template #icon>
      <i class="iconfont mj-exit"></i>
    </template>
  </van-cell>

  <!-- 退出选择弹层 -->
  <van-popup v-model:show="show" position="bottom" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <div class="main">
      <div v-if="item.systemName == 'iOS' || !item.isPlus">
        <van-cell title="退出后不会删除任何历史数据，下次登录依然可以使用本账号。"
          title-style="font-size: 0.48rem; color: #909399; text-align: center" />

        <van-cell title="退出登录" title-style="text-align: center" v-stat="{ type: 8, page: '/home/me', remarks: '点击退出登录' }"
          @click="$emit('logOut')" />
      </div>

      <div v-else>
        <van-cell title="退出登录" title-style="text-align: center" v-stat="{ type: 8, page: '/home/me', remarks: '点击退出登录' }"
          @click="$emit('logOut')" />

        <van-cell :title="`关闭${item.name}`" title-style="text-align: center"
          v-stat="{ type: 8, page: '/home/me', remarks: `点击关闭${item.name}` }" @click="closeApp" />
      </div>
      <div class="bg"></div>
      <van-button class="cancel" text="取消" :color="item.inverseColor" :block="true" :square="true"
        @click.stop="show = false"></van-button>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.main {
  &:deep(.van-cell) {
    --van-cell-vertical-padding: .48rem;
    --van-cell-horizontal-padding: .64rem;
    @include tx(.56rem, .8rem);
  }

  .bg {
    height: 0.32rem;
    background: rgba(247, 248, 250, 1);
  }

  .cancel {
    height: 2rem;
    line-height: 2rem;

    &:deep(span) {
      @include tx(.64rem);
      color: var(--meng-primary-color);
    }
  }
}
</style>
