<script setup>
defineProps({
  text: {
    type: String,
    default: '暂无数据'
  },
  color: String
})
</script>

<template>
  <div class="null">
    <div class="icon">
      <i class="iconfont mj-no-data"></i>
    </div>
    <div class="tips" :style="{ color: color }">
      {{ text }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.null {
  position: relative;
  padding-top: 30vh;
  color: #909399;

  .icon {
    @include flex($justify: center);

    >i {
      @include tx(2rem);
    }
  }

  .tips {
    padding-top: .32rem;
    @include tx(.56rem, .72rem);
    text-align: center;
  }
}
</style>
