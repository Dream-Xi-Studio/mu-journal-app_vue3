<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
</script>

<template>
  <Layout class="functionDetail">
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="content">
      <div>
        <div class="title">
          <strong>1.0.0版本更新</strong>
        </div>
        <div>1. 新增自定义分类功能，可在分类中选择的图标及颜色将做为置顶图标显示；</div>
        <div>2. 新增纪念日功能，可以设置重复提醒，还可以添加不同的描述；</div>
        <div>3. 新增账号切换功能，可以快速切换不同的账号；</div>
        <div>4. 新增个性装扮功能，可以调整不同的主题~</div>
      </div>
    </div>
    <div class="footer">
      <div class="logo">
        <img src="@assets/images/logo.png" alt="logo" />
      </div>
      <div class="tips">
        最终解释权归{{ getApp('name') }}所有
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.functionDetail:deep(.body) {
  height: 100vh;
  background: var(--meng-inverse-placeholder);
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
  top: calc(var(--app-status-bar) + 7.4rem);
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
  @include bottom(.2rem);
  background: rgba(255, 245, 227, 1);
}

.content {
  position: relative;
  padding: .8rem .6rem 0;
  @include tx(.48rem, .72rem);

  >div {
    padding-bottom: 1.4rem;

    .title {
      padding-bottom: .4rem;
    }
  }
}

.footer {
  position: relative;
  padding: .6rem .6rem 0;
  padding-bottom: calc(0.8rem + constant(safe-area-inset-bottom));
  padding-bottom: calc(0.8rem + env(safe-area-inset-bottom));

  .logo {
    @include flex(center);

    >img {
      width: 1.76rem;
    }
  }

  .tips {
    padding-top: .4rem;
    @include tx(.48rem);
    color: #909399;
    text-align: center;
  }
}
</style>
