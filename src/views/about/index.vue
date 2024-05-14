<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)

/**
 * 检查更新
 */
const checkVersion = () => {
  if (getApp.value('upgradeUrl')) {
    mui.plusReady(() => {
      plus.runtime.openURL(getApp.value('upgradeUrl'))
    })
  } else {
    mui.getJSON(`${getServer.value('baseURL')}/update.json`, res => {
      store.dispatch('app/UpgradeApp', res, true)
    })
  }
}
</script>

<template>
  <Layout class="about" :title="`关于${getApp('name')}`">
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="box">
      <div class="logo">
        <img src="@assets/images/logo.png" />
      </div>
      <div class="name">{{ getApp('name') }}</div>
      <div class="edition">
        <span>Version&nbsp;</span>
        <span>{{ getApp('version') }}</span>
      </div>
    </div>

    <van-cell-group :border="false">
      <van-cell title="检查版本" :value="`${getApp('upgradeUrl') ? '发现新版本，立即更新' : ''}`" is-link center
        v-stat="{ type: 5, page: '/about', remarks: '点击检查版本' }" @click.stop="checkVersion" v-if="getApp('isPlus')" />

      <van-cell title="功能介绍" to="/about/functionDetail" is-link center
        v-stat="{ type: 4, page: '/about', remarks: '查看功能介绍' }" />

      <van-cell title="帮助中心" to="/help" is-link center v-stat="{ type: 4, page: '/about', remarks: '查看帮助中心' }" />

      <van-cell title="意见反馈" to="/about/feedback" is-link center
        v-stat="{ type: 3, page: '/about', remarks: '跳转到意见反馈' }" />
    </van-cell-group>

    <div class="footer">
      <div class="btns">
        <div class="btn" v-stat="{ type: 4, page: '/about', remarks: '查看服务协议' }"
          @click.stop="$router.push('/about/service')">
          服务协议
        </div>
        <div class="line"></div>
        <div class="btn" v-stat="{ type: 4, page: '/about', remarks: '查看隐私政策' }"
          @click.stop="$router.push('/about/privacy')">
          隐私政策
        </div>
      </div>
      <div class="tips">梦兮工作室 版本所有 ©2023</div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.about:deep(.body) {
  height: 100vh;
  background: var(--meng-inverse-placeholder);

  .van-cell-group {
    --van-cell-group-background: var(--meng-inverse-placeholder);

    .van-cell {
      --van-cell-vertical-padding: .56rem;
      --van-cell-horizontal-padding: .6rem;
      --van-cell-background: var(--meng-inverse-placeholder);
      @include tx(.56rem, .8rem);
    }
  }
}

.purple,
.blue,
.yellow {
  position: fixed;
  @include size(5.44rem);
  border-radius: 50%;
  filter: blur(.16rem);
}

.purple {
  top: calc(var(--app-status-bar) + 7.2rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(4.2rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom();
  background: rgba(255, 245, 227, 1);
}

.box {
  position: relative;
  padding: 1.6rem 0 .6rem;
  text-align: center;

  .logo {
    @include flex(center);

    >img {
      width: 2.88rem;
    }
  }

  .name {
    padding: .64rem 0 .32rem;
    @include tx(.64rem);
  }

  .edition {
    @include tx(.56rem);
    letter-spacing: 0.02rem;
  }
}

.footer {
  position: absolute;
  left: 0;
  right: 0;
  @include bottom(1.6rem);
  text-align: center;

  .btns {
    padding-bottom: .56rem;
    @include flex(center);

    .btn {
      @include tx(.48rem);
      color: var(--meng-primary-color);
    }

    .line {
      position: relative;
      margin: 0 .32rem;
      @include line(left, $color: #ebedf0);
    }
  }

  .tips {
    @include tx(.48rem, .72rem);
    color: #909399;
  }
}
</style>
