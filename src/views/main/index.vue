<script setup>
import tabbar from '@router/tabbar'
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
  <van-tabbar class="tabbar" :border="false" z-index="10" :route="true" :placeholder="true"
    :safe-area-inset-bottom="true">
    <van-tabbar-item v-for="t in tabbar" :key="t.path" :to="`/home${t.path && `/${t.path}`}`" :replace="true">
      <span>{{ t.meta.title }}</span>
      <template #icon>
        <i :class="['iconfont', t.meta.icon]"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.tabbar {
  height: 2rem !important;
  background: transparent;

  &:deep(.van-tabbar) {
    height: 2rem;
    background: var(--meng-inverse-placeholder);
    box-shadow: 0px -8px 26px 0px rgba(73, 78, 92, 0.05);

    .van-tabbar-item {
      @include tx(.48rem);
      color: #909399;
      font-weight: 400;
      transition: all .4s;

      .van-tabbar-item__icon {
        margin-bottom: .16rem;

        >i {
          @include tx(.8rem);
        }
      }
    }

    .van-tabbar-item--active {
      color: var(--meng-primary-color);
      background: var(--meng-inverse-placeholder);
    }
  }
}
</style>
