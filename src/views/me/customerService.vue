<script setup>
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="qr">
      <img src="./images/qr.jpg" loading="lazy" />
    </div>
    <div class="tips">有什么问题请添加我的个人微信，谢谢！</div>
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
  top: calc(var(--app-status-bar) + 6.4rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(7.6rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(1rem);
  background: rgba(255, 245, 227, 1);
}

.qr {
  position: relative;
  padding-top: 4.8rem;
  @include flex(center);

  img {
    @include size(6.4rem);
  }
}

.tips {
  padding-top: .32rem;
  @include tx(.48rem);
  color: #F56C6C;
  text-align: center;
}
</style>
