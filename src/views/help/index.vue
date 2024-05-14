<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)

const toolbars = [
  {
    title: '如何修改密码？',
    to: '/help/updatePassword'
  },
  {
    title: '如何找回密码？',
    to: '/help/retrievePassword'
  },
  {
    title: '账号被盗怎么办？如何避免被盗号？',
    to: '/help/stolen'
  },
  {
    title: '账号被冻结封禁了怎么办？',
    to: '/help/freezeBanned'
  }
]
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <!-- 常见问题 -->
    <div class="box">
      <div class="title">
        <div class="icon"></div>
        <span>常见问题</span>
      </div>
      <van-cell-group :border="false">
        <van-cell v-for="(tb, i) in toolbars" :key="i" :title="tb.title" :to="tb.to" is-link center
          v-stat="{ type: 4, page: '/help', remarks: `查看${tb.title}` }" />
      </van-cell-group>
    </div>

    <!-- 客户帮助 -->
    <div class="customer">
      <div class="title">
        <div class="icon"></div>
        <span>客户帮助</span>
      </div>
      <div class="customer-box">
        <div class="desc">
          为及时解决您的问题，建议您通过联系在线客服提交意见反馈，我们会尽快在24小时内受理您的问题。
        </div>
        <div class="tit">
          <strong>联系我们</strong>
        </div>
        <div class="txt">
          {{ getApp('name') }}APP中--我的--联系客服进行咨询
        </div>
      </div>
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
  top: calc(var(--app-status-bar) + 7rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(4.4rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom();
  background: rgba(255, 245, 227, 1);
}

.title {
  position: relative;
  padding: .96rem 0 .4rem;
  @include flex($align: center);

  .icon {
    margin-left: .6rem;
    @include size(0.16rem, 0.48rem);
    background: var(--meng-primary-color);
  }

  >span {
    margin-left: .24rem;
    @include tx(.48rem);
    color: var(--meng-primary-color);
  }
}

.box:deep(.van-cell-group) {
  --van-cell-group-background: var(--meng-inverse-placeholder);

  .van-cell {
    --van-cell-horizontal-padding: .6rem;
    --van-cell-background: var(--meng-inverse-placeholder);
    @include tx(.56rem, .8rem);
  }
}

.customer {
  @include tx(.48rem);

  &-box {
    padding: .48rem .6rem;
    background: var(--meng-inverse-placeholder);

    .desc {
      line-height: .64rem;
    }

    .tit {
      padding-top: .4rem;
    }

    .txt {
      padding: .32rem 0 .16rem;
    }
  }
}
</style>
