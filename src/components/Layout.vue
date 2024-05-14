<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  // 标题
  title: String,

  // 右侧文案
  rightText: String,

  // 是否显示左侧箭头
  leftArrow: {
    type: Boolean,
    default: true,
  },

  // 头部的css对象
  headStyle: Object,

  // 身体的样式
  bodyStyle: Object,

  // 是否使用title插槽
  isTitle: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['click-right'])

// 获取store对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
// 距顶部的距离
const top = computed(() => `${getApp.value('height') + 1.76 * getApp.value('fontSize')}px`)

// 点击右侧按钮时触发
const clickRight = (event) => {
  emit("click-right", event);
}

mui.plusReady(() => {
  const style = plus.navigator.getStatusBarStyle()
  if (style == 'light') {
    store.dispatch('app/SetStatusBarStyle', 'dark')
  }
})
</script>

<template>
  <div class="layout" :style="{ '--app-status-bar': `${getApp('height')}px` }">
    <!-- 头部 -->
    <van-nav-bar :style="[{ paddingTop: `${getApp('height')}px`, height: top }, headStyle]"
      :title="title || $route.meta.title" :right-text="rightText" :left-arrow="leftArrow" :border="false" :fixed="true"
      z-index="5" @click-left="$router.back()" @click-right="clickRight">
      <template v-if="!leftArrow" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="isTitle" #title>
        <slot name="title"></slot>
      </template>
      <template v-if="!rightText" #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
    <!-- 身体 -->
    <div class="body" :style="[{ paddingTop: top }, bodyStyle]">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  &:deep(.van-nav-bar) {
    --van-nav-bar-background: var(--meng-primary-color);

    .van-nav-bar__content {
      --van-padding-md: .6rem;
      --van-nav-bar-height: 100%;

      .van-nav-bar__left {
        .van-nav-bar__arrow {
          @include tx(.72rem);
          --van-nav-bar-icon-color: var(--meng-inverse-color);
        }
      }

      .van-nav-bar__title {
        @include tx(.64rem, .88rem);
        --van-nav-bar-title-text-color: var(--meng-inverse-color);
      }

      .van-nav-bar__right {
        --van-nav-bar-icon-color: var(--meng-inverse-color);
      }
    }
  }

  >.body {
    position: relative;
    overflow: hidden;
  }
}
</style>
