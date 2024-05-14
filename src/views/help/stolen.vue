<script setup>
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="title">
      <strong>账号被盗怎么办？如何避免被盗号？</strong>
    </div>
    <div class="desc">
      <code>1. 请勿私下买卖账号，不可主动泄露账号密码以及共享账号；</code>
    </div>
    <div class="desc">
      <code>2. 在登录账号时，若发现账号异常，请立即修改登录密码；</code>
    </div>
    <div class="desc">
      <code>如发现他人未经许可使用您的账号，请立即联系在线客服提供账号登陆+实名信息申请冻结，客服将会暂时冻结您的账号以保障账号安全</code>
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
  top: calc(var(--app-status-bar) + 6.8rem);
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
  @include bottom(.8rem);
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
