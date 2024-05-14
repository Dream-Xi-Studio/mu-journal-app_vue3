<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
</script>

<template>
  <div class="layout" :style="{ paddingTop: `${getApp('height')}px` }">
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  position: relative;
  height: 100vh;
  background: var(--meng-inverse-color);
  overflow: hidden;

  .bg1 {
    position: absolute;
    top: -2.6rem;
    left: -4.2rem;
    @include size(12.2rem);
    @include image(url('../images/bg1.png'));
  }

  .bg2 {
    position: absolute;
    top: 3.2rem;
    right: -4.6rem;
    @include size(12.2rem);
    @include image(url('../images/bg2.png'));
  }

  .bg3 {
    position: absolute;
    left: -4.8rem;
    bottom: -4.4rem;
    @include size(13.88rem, 24rem);
    @include image(url('../images/bg3.png'));
  }

  &:deep(.main) {
    position: relative;
    height: max(25.6rem, 100%);

    .info {
      position: relative;
      padding-top: 2.4rem;

      .logo {
        @include flex(center);

        >img {
          width: 2.52rem;
        }
      }

      .name {
        margin-top: .68rem;
        @include tx(.8rem, 1.2rem);
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #707070;
        text-align: center;
      }
    }

    .frm {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1.44rem 1rem 2.16rem;
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      border-radius: 1.2rem 1.2rem 0 0;

      .title {
        @include tx(20px, 30px);
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: var(--meng-primary-color);
      }

      .tips {
        margin: .52rem 0 1.76rem;
        @include tx(.56rem, .84rem);
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #AFAFAF;
        text-align: right;

        a {
          color: var(--meng-primary-color);
        }
      }

      >button {
        --van-button-default-height: 1.92rem;
        --van-button-default-line-height: 1.92rem;
        --van-button-normal-font-size: .64rem;

        span {
          @include tx(.64rem, .88rem);
        }
      }

      .btns {
        margin-top: 2.24rem;
        @include tx(.56rem, .8rem);

        >code {
          @include center(flex);

          .btn {
            color: var(--meng-primary-color);
          }

          .btn:nth-child(2n) {
            padding: 0 .4rem;
          }
        }
      }
    }
  }
}
</style>
