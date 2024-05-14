<script setup>
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="title">
      <strong>如何找回密码？</strong>
    </div>
    <div class="desc">
      <code>在登陆页面点击【忘记密码】，填写对应的资料后进行验证，通过后便能设置新密码。</code>
    </div>
    <div class="desc">
      <code>在登陆页面点击【联系客服】，联系客服热线进行申诉，提交申诉后有结果会主动告知，耐心等待即可。</code>
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
  top: calc(var(--app-status-bar) + 7.4rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(6.2rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.4rem);
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
