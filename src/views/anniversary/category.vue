<script setup>
import { defineAsyncComponent, ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { showConfirmDialog, showSuccessToast } from 'vant'
import { AddCategory, UpdateCategory, DeleteCategory } from '@api/category'
import { AddBehavior } from '@api/index'

const EditCategory = defineAsyncComponent(() => import('./components/EditCategory.vue'))

// 获取vuex对象
const store = useStore()
const getAnniversary = computed(() => store.getters.getAnniversary)
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)

// 滑动单元格组件实例数组
const tabRef = ref([])

/**
 * 打开对应滑动单元格侧边栏
 * @param {Number} index 下标
 */
const openDelete = index => {
  tabRef.value[index].open('right')
}

/**
 * 删除事件
 * @param {Number} id 分类ID
 */
const Delete = id => {
  if (getServer.value('loading')) return
  showConfirmDialog({
    title: '提示',
    message: '是否删除该分类？',
    className: 'confirm_dialog',
    confirmButtonColor: getApp.value('primaryColor'),
    closeOnClickOverlay: true
  })
    .then(async () => {
      try {
        await AddBehavior({
          uuid: getApp.value('uuid'),
          type: 2,
          page: '/anniversary/category',
          remarks: `删除ID为${id.value}的纪念日`
        })
      } catch { }
      try {
        await store.dispatch('server/GetTimestamp', '/category/delete')
        const res = await DeleteCategory({
          data: id,
          time: getServer.value('systemTime'),
          sign: 'sha256'
        })
        // 获取分类信息
        await store.dispatch('anniversary/FindCategoryAll')
        showSuccessToast(res)
      } catch { }
    })
    .catch(() => { })
}

// 编辑弹窗的参数对象
const editParams = reactive({
  show: false,
  title: '',
  params: {
    id: 0,
    name: '',
    icon: 'mj-label',
    color: '#f08487'
  }
})
// 表单JSON数据
const categoryJSON = JSON.stringify({ id: 0, name: '', icon: 'mj-label', color: '#f08487' })

/**
 * 显示编辑弹窗
 * @param {Number} type 类型
 * @param {Object} item 分类对象
 */
const ShowCategory = (type, item) => {
  editParams.params = JSON.parse(categoryJSON)
  if (type === 1) {
    editParams.title = '新建分类'
  } else if (type === 2) {
    editParams.title = '修改分类'
    editParams.params = item
  }
  editParams.show = true
}

/**
 * 提交表单
 */
const submit = async () => {
  const { params } = editParams
  try {
    await AddBehavior({
      uuid: getApp.value('uuid'),
      type: 2,
      page: '/anniversary/category',
      remarks: params.id > 0 ? `修改ID为${params.id}的分类` : '新增分类'
    })
  } catch { }
  if (!params.name) {
    return mui.toast('请输入分类名称')
  } else if (params.name.length > 10) {
    return mui.toast('分类名称长度不能超过10字符')
  }
  if (!params.icon) return mui.toast('请选择图标')
  if (!params.color) return mui.toast('请选择颜色')
  try {
    let res
    if (params.id) {
      await store.dispatch('server/GetTimestamp', '/category/update')
      // 修改
      res = await UpdateCategory({
        data: params,
        time: getServer.value('systemTime'),
        sign: 'sha256'
      })
    } else {
      await store.dispatch('server/GetTimestamp', '/category/add')
      // 新增
      res = await AddCategory({
        data: {
          ...params,
          id: void 0
        },
        time: getServer.value('systemTime'),
        sign: 'sha512'
      })
    }
    // 获取分类信息
    await store.dispatch('anniversary/FindCategoryAll')
    showSuccessToast(res)
    editParams.show = false
  } catch { }
}
</script>

<template>
  <Layout>
    <template v-if="getAnniversary('categoryList').length < 10" #right>
      <van-icon name="add-o" size=".8rem" v-stat="{ type: 6, page: '/anniversary/category', remarks: '新增分类弹窗' }"
        @click.stop="ShowCategory(1)" />
    </template>

    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="tab" v-if="getAnniversary('categoryList').length > 0">
      <div class="item" v-for="(c, i) in getAnniversary('categoryList')" :key="i">
        <i class="iconfont mj-delete" v-stat="{ type: 7, page: '/anniversary/category', remarks: `显示分类ID为${c.id}的删除按钮` }"
          @click.stop="openDelete(i)"></i>

        <van-swipe-cell class="category" ref="tabRef" :stop-propagation="true">
          <div class="content" v-stat="{ type: 6, page: '/anniversary/category', remarks: `修改ID为${c.id}的分类弹窗` }"
            @click.stop="ShowCategory(2, c)">
            <div class="icon" :style="{ background: c.color }">
              <i class="iconfont" :class="c.icon"></i>
            </div>
            <div class="txt">{{ c.name }}</div>
          </div>
          <template #right>
            <van-button type="danger" text="删除" :square="true"
              v-stat="{ type: 5, page: '/anniversary/category', remarks: `是否删除ID为${c.id}的分类` }"
              @click.stop="Delete(c.id)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <Empty v-else></Empty>

    <!-- 新增或修改弹窗 -->
    <edit-category v-model:show="editParams.show" :title="editParams.title" v-model:params="editParams.params"
      @commit="submit"></edit-category>
  </Layout>
</template>

<style lang="scss" scoped>
.purple,
.blue,
.yellow {
  position: fixed;
  @include size(5.44rem);
  border-radius: 50%;
}

.purple {
  top: calc(var(--app-status-bar) + 7.12rem);
  left: 0;
  background: rgba(249, 237, 255, 0.4);
}

.blue {
  right: 0;
  @include bottom(5.24rem);
  background: rgba(235, 245, 255, 0.4);
}

.yellow {
  left: 0;
  @include bottom(1.2rem);
  background: rgba(255, 245, 227, 0.4);
}

.tab {
  position: relative;
  padding-top: .52rem;

  .item {
    position: relative;
    margin: .48rem .6rem;
    @include flex($align: center);

    >i {
      margin-right: .48rem;
      @include tx(.96rem);
      color: var(--meng-primary-color);
    }

    .category {
      position: relative;
      padding: .4rem .6rem;
      flex: 1;
      border-radius: .16rem;
      background: var(--meng-inverse-color);

      .content {
        @include flex($align: center);

        .icon {
          margin-right: .56rem;
          @include size(1.12rem);
          border-radius: 50%;
          @include center(flex);

          >i {
            @include tx(.64rem);
            color: #fff;
          }
        }

        .txt {
          flex: 1;
          @include tx(.56rem, .8rem);
          color: rgba(51, 51, 51, 1);
          @include omit;
        }
      }

      &:deep(.van-swipe-cell__right) {
        position: absolute;
        top: -0.4rem;
        right: -0.6rem;
        height: 1.92rem;

        >button {
          --van-button-default-font-size: .56rem;
          --van-button-default-height: 1.92rem;
          --van-button-danger-color: var(--meng-inverse-color);
        }
      }
    }
  }
}
</style>
