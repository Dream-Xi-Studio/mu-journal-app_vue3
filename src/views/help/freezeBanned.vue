<script setup>
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="title">
      <strong>账号被冻结封禁了怎么办？</strong>
    </div>
    <div class="desc">
      <code>因涉及违规问题而被冻结封禁的账号，等封禁时间结束将会自动解封</code>
    </div>
    <div class="desc">
      <code>*如对账号冻结/封禁有疑问的，可提供账号联系在线客服</code>
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
  filter: blur(.16rem);
}

.purple {
  top: calc(var(--app-status-bar) + 6.6rem);
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
  @include bottom(.6rem);
  background: rgba(255, 245, 227, 1);
}

.title {
  position: relative;
  padding: .8rem .6rem 0;
  @include tx(.56rem, .88rem);
}

.desc {
  position: relative;
  padding: .32rem .6rem 0;
  @include tx(.48rem, .72rem);
}
</style>
