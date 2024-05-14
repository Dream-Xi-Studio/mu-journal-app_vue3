<script setup>
import { defineAsyncComponent, ref, computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { FindByCategory } from '@api/anniversary'
import debounce from 'lodash/debounce'
import { showLoadingToast } from 'vant'
import { AddBehavior } from '@api/index'

// 异步加载组件
const Days = defineAsyncComponent(() => import('./components/Days.vue'))

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
// 距顶部的距离
const top = computed(() => `${getApp.value('height') + 1.76 * getApp.value('fontSize')}px`)
const getAnniversary = computed(() => store.getters.getAnniversary)
// 分类列表
const categoryArray = computed(() => {
  return [{ id: 0, name: '全部' }, ...getAnniversary.value('categoryList')]
})

// 绑定当前选中标签的标识符
const id = ref(Number(getAnniversary.value('category_id')))
// 当前页数
const page = ref(1)
// 总页数
const totalPage = ref(0)
// 列表数据
const list = ref([])

// 根据分类获取纪念日列表
const findByCategory = async () => {
  let loading = {}
  try {
    if (!list.value?.length) loading = showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    await store.dispatch('server/GetTimestamp', '/anniversary/findByCategory')
    const res = await FindByCategory({
      data: id.value,
      pages: {
        page: page.value,
        limit: 10,
      },
      time: getServer.value('systemTime'),
      sign: 'sha256'
    })
    const item = JSON.parse(Dense.decrypt(res))
    totalPage.value = item.totalPage || 0
    list.value = list.value.concat(item.list || [])
  } finally {
    loading?.close()
  }
}

// 是否处于加载中状态
const isLoading = ref(false)
// 是否处于加载状态
const loading = ref(false)
// 是否已加载完成
const finished = ref(false)
// 加载完成后的提示文案
const finishedText = ref('没有更多了')

/**
 * 当前激活的标签改变时触发
 */
const tabChange = async name => {
  try {
    await AddBehavior({
      uuid: getApp.value('uuid'),
      type: 4,
      page: '/home/anniversary',
      remarks: `查看分类ID为${name}下的所有纪念日`
    })
  } catch { }
  store.commit('anniversary/SET', { category_id: name })
  page.value = 1
  totalPage.value = 0
  list.value = []
  finished.value = false
  findByCategory()
}

/**
 * 刷新列表
 */
const refresh = async () => {
  page.value = 1
  totalPage.value = 0
  list.value = []
  await findByCategory()
  if (page.value < totalPage.value) {
    finished.value = false
    finishedText.value = ''
  }
}

/**
 * 下拉刷新事件
 */
const onRefresh = async () => {
  try {
    await store.dispatch('anniversary/FindCategoryAll')
    await refresh()
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

/**
 * 上拉加载列表
 */
const onLoad = debounce(async () => {
  if (page.value < totalPage.value) {
    page.value++
    await findByCategory()
  }
  // 加载状态结束
  loading.value = false
  // 数据全部加载完成
  if (page.value >= totalPage.value) {
    finished.value = true
    finishedText.value = '没有更多了'

    setTimeout(() => {
      finishedText.value = ''
    }, 1000)
  }
}, 200)

onUnmounted(() => {
  onLoad.cancel()
})

// 获取分类信息
store.dispatch('anniversary/FindCategoryAll')
findByCategory()
</script>

<template>
  <Layout title="纪念日" :leftArrow="false">
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <!-- 标签页 -->
    <van-tabs class="tab" v-model:active="id" :animated="true" :sticky="true" :offset-top="top" :swipe-threshold="4"
      :key="getApp('fontSize')" @change="tabChange">
      <van-tab v-for="category in categoryArray" :key="category.id" :title="category.name" :name="category.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" pulling-text="下拉即可刷新..." loosing-text="释放即可刷新..." loading-text="加载中..."
          success-text="刷新成功" :style="{ '--pull-refresh-height': `calc(100vh - 5.36rem - ${getApp('height')}px)` }"
          @refresh="onRefresh">
          <template v-if="list && list.length > 0">
            <!-- 上拉加载 -->
            <van-list v-model:loading="loading" :finished="finished" loading-text="加载中..." :finished-text="finishedText"
              @load="onLoad">
              <Days v-for="item in list" :key="item.id" :anniversary="item" @refresh="refresh"></Days>
            </van-list>
          </template>

          <Empty v-else></Empty>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <!-- 分类按钮 -->
    <div class="manage" :style="{ top: top }" v-stat="{ type: 4, page: '/home/anniversary', remarks: '查看分类列表' }"
      @click.stop="$router.push('/anniversary/category')">
      <i class="iconfont mj-classification"></i>
      <span>分类</span>
    </div>

    <!-- 新增 -->
    <div class="add" v-stat="{ type: 3, page: '/home/anniversary', remarks: '跳转到新增纪念日页面' }"
      @click.stop="$router.push('/anniversary/add')">
      <van-icon name="plus" size="1rem" />
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
  top: calc(var(--app-status-bar) + 7.12rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(4.12rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom();
  background: rgba(255, 245, 227, 1);
}

.van-tabs {
  --van-tabs-line-height: 1.6rem;
  --van-tabs-bottom-bar-width: 1.6rem;
  --van-tabs-bottom-bar-height: .12rem;
  --van-tab-text-color: rgba(51, 51, 51, 1);
  --van-tabs-bottom-bar-color: var(--meng-primary-color);
  --van-tab-active-text-color: var(--meng-primary-color);
  --van-tabs-nav-background-color: var(--meng-inverse-color);

  &:deep(.van-sticky--fixed) {
    height: inherit !important;
  }

  &:deep(.van-tabs__wrap) {
    padding-right: 2.48rem;

    .van-tabs__nav--line {
      padding-bottom: 0.6rem;

      .van-tab {
        padding: 0 0.48rem;
        @include tx(.56rem);
      }

      .van-tabs__line {
        bottom: 0.6rem;
      }
    }
  }

  &:deep(.van-tabs__content) {
    height: auto;

    .van-pull-refresh {
      min-height: var(--pull-refresh-height);

      .van-pull-refresh__track {
        min-height: calc(var(--pull-refresh-height) - .56rem);
      }
    }
  }
}

.manage {
  position: fixed;
  right: 0;
  padding: 0 .32rem;
  height: 1.6rem;
  @include tx(.56rem);
  color: rgba(51, 51, 51, 1);
  background-color: var(--meng-inverse-color);
  z-index: 100;
  @include flex($align: center);

  >i {
    @include tx(.56rem);
  }

  >span {
    margin-left: .16rem;
  }
}

.add {
  position: fixed;
  right: 0.6rem;
  bottom: calc(2.6rem + constant(safe-area-inset-bottom));
  bottom: calc(2.6rem + env(safe-area-inset-bottom));
  @include size(2rem);
  color: var(--meng-inverse-color);
  border-radius: 50%;
  background-color: var(--meng-primary-placeholder);
  @include center(flex);
  z-index: 15;
}
</style>
