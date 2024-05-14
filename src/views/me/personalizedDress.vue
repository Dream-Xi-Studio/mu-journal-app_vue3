<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { SetUserConfig } from '@api/user'
import { showSuccessToast } from 'vant'

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
const getSystem = computed(() => store.getters.getSystem)
const getUser = computed(() => store.getters.getUser)

// 定义当前选中的主题
const active = ref(getUser.value('config')?.themeId || 1)

watch(
  () => active.value,
  () => {
    setUserConfig()
  }
)

// 修改用户配置信息
const setUserConfig = async () => {
  try {
    await store.dispatch('server/GetTimestamp', '/user/config/update')
    const res = await SetUserConfig({
      data: {
        name: 'themeId',
        value: active.value
      },
      time: getServer.value('systemTime'),
      sign: 'sha512'
    })
    await store.dispatch('user/GetUserConfig')
    showSuccessToast(res)
    const item = getSystem.value('themeList').find(item => item.id == active.value)
    store.commit('app/SET', { primaryColor: item.primary, inverseColor: item.inverse })
    const root = document.querySelector(':root')
    root.style.setProperty('--meng-primary-color', item.primary)
    root.style.setProperty('--meng-primary-placeholder', item.primaryPlaceholder)
    root.style.setProperty('--meng-inverse-color', item.inverse)
    root.style.setProperty('--meng-inverse-placeholder', item.inversePlaceholder)
  } catch { }
}

if (!getSystem.value('themeList')?.length) {
  store.dispatch('system/FindThemeAll')
}
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <van-row class="tab" justify="space-between">
      <van-col span="11" v-for="(theme, index) in getSystem('themeList')" :key="index">
        <van-radio :name="theme.id" icon-size="0.64rem" :checked-color="getApp('primaryColor')" v-model="active"
          v-stat="{ type: 2, page: '/me/personalizedDress', remarks: `切换ID为${theme.id}的主题` }">
          <span>{{ theme.name }}</span>
        </van-radio>
        <div class="color">
          <div v-stat="{ type: 2, page: '/me/personalizedDress', remarks: `切换ID为${theme.id}的主题` }"
            @click.stop="active = theme.id">
            <div :style="{ background: theme.primary }"></div>
            <div :style="{ background: theme.primary_placeholder }"></div>
            <div :style="{ background: theme.inverse }"></div>
            <div :style="{ background: theme.inverse_placeholder }"></div>
          </div>
        </div>
      </van-col>
    </van-row>
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
  top: calc(var(--app-status-bar) + 6rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(7.2rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.6rem);
  background: rgba(255, 245, 227, 1);
}

.tab {
  position: relative;
  padding: 0 .6rem;

  &:deep(.van-col) {
    padding: .48rem 0;

    .van-radio__label {
      @include flex($align: center);

      >span {
        @include tx(.48rem, .72rem);
      }
    }

    .color {
      margin-top: .24rem;
      margin-left: .72rem;
      padding-left: .24rem;

      >div {
        width: 3.2rem;
        border: 0.04rem solid #909399;
        border-radius: 0.32rem;

        >div {
          height: 0.8rem;
        }

        >div:first-child {
          border-radius: 0.32rem 0.32rem 0 0;
        }

        >div:last-child {
          border-radius: 0 0 0.32rem 0.32rem;
        }
      }
    }
  }
}
</style>
