<script setup>
import { defineAsyncComponent, ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { AddAnniversary, FindAnniversaryById, UpdateAnniversary, DeleteAnniversaryById } from '@api/anniversary'
import { showSuccessToast, showConfirmDialog } from 'vant'
import { AddBehavior } from '@api/index'

const TargetTime = defineAsyncComponent(() => import('./components/TargetTime.vue'))
const ReminderTime = defineAsyncComponent(() => import('./components/ReminderTime.vue'))

// 获取路由对象
const route = useRoute()
const router = useRouter()
// 获取vuex对象
const store = useStore()
const getAnniversary = computed(() => store.getters.getAnniversary)
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
const getSystem = computed(() => store.getters.getSystem)

// 纪念日的id，如果没有则表示新增纪念日
const id = ref(Number(route.params.id) || 0)
// 进入该页面的历史页面有几个
const num = ref(Number(route.params.num) || 0)
// 目标日组件实例
const target_time = ref(null)
// 提醒组件实例
const reminder_time = ref(null)

// 新增或修改纪念日的参数
const params = reactive({
  title: '',
  categoryId: [],
  calendarType: 1,
  targetTime: '',
  repeatId: [],
  reminderId: 1,
  reminderTime: '',
  sign: 2,
  remarks: ''
})

/**
 * 获取纪念日信息
 */
const findAnniversaryById = async () => {
  try {
    let res = await FindAnniversaryById(id.value)
    res = JSON.parse(Dense.decrypt(res))
    params.title = res.title
    params.categoryId = [res.category.id]
    params.calendarType = res.calendarType
    if (res.targetTime) {
      params.targetTime = res.targetTime
      target_time.value.initDate()
    }
    params.repeatId = res.repeat?.id ? [res.repeat.id] : []
    params.reminderId = res.reminder?.id
    if (res.reminderTime) {
      params.reminderTime = res.reminderTime
      reminder_time.value.setDefault()
    }
    params.sign = res.sign
    params.remarks = res.remarks
  } catch { }
}

/**
 * 提交
 */
const submit = async () => {
  try {
    await AddBehavior({
      uuid: getApp.value('uuid'),
      type: 2,
      page: route.path,
      remarks: id.value > 0 ? `修改ID为${id.value}的纪念日` : '新增纪念日'
    })
  } catch { }
  if (!params.title) {
    return mui.toast('请输入标题')
  } else if (params.title.length > 10) {
    return mui.toast('标题长度不能超过10字符')
  }
  if (!params.categoryId) return mui.toast('请选择分类')
  if (!params.targetTime) return mui.toast('请选择目标日')
  if (params.remarks.length > 100) return mui.toast('备注长度不能超过100字符')
  try {
    const data = {
      data: {
        ...params,
        categoryId: Number(params.categoryId.join()),
        repeatId: Number(params.repeatId.join())
      },
      sign: 'sha512'
    }
    let res
    if (id.value > 0) {
      await store.dispatch('server/GetTimestamp', '/anniversary/update')
      res = await UpdateAnniversary({
        ...data,
        data: {
          ...data.data,
          id: id.value
        },
        time: getServer.value('systemTime'),
        salt: '{Us5&sUN@R,aBT8=!])&5,5nH><,loE['
      })
    } else {
      await store.dispatch('server/GetTimestamp', '/anniversary/add')
      res = await AddAnniversary({
        ...data,
        time: getServer.value('systemTime'),
        salt: 'GDc:$LcR-JK&>*IOC.NTb4)|9.+=&:,E'
      })
    }
    showSuccessToast(res)
    router.back()
  } catch { }
}

/**
 * 删除
 */
const Delete = async () => {
  if (getServer.value('loading')) return
  showConfirmDialog({
    title: '提示',
    message: '是否删除该目标日？',
    className: 'confirm_dialog',
    confirmButtonColor: getApp.value('primaryColor'),
    closeOnClickOverlay: true
  })
    .then(async () => {
      try {
        await AddBehavior({
          uuid: getApp.value('uuid'),
          type: 2,
          page: '/home/anniversary',
          remarks: `删除ID为${id.value}的纪念日`
        })
      } catch { }
      try {
        await store.dispatch('server/GetTimestamp', '/anniversary/delete')
        const res = await DeleteAnniversaryById({
          data: id.value,
          time: getServer.value('systemTime'),
          sign: 'sha256'
        })
        showSuccessToast(res)
        router.go(`-${num.value}`)
      } catch { }
    })
    .catch(() => { })
}

if (!getSystem.value('repeatList')?.length) {
  store.dispatch('system/FindRepeatAll')
}
// 初始化数据
if (id.value > 0) {
  findAnniversaryById()
}
</script>

<template>
  <Layout>
    <template #right v-if="id > 0">
      <van-icon name="delete" size="0.72rem" v-stat="{ type: 5, page: route.path, remarks: `是否删除ID为${id}的纪念日` }"
        @click.stop="Delete" />
    </template>

    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="frm">
      <!-- 标题 -->
      <van-field v-model="params.title" label="标题" maxlength="10" placeholder="请输入标题" :border="false"
        @keyup.enter="submit" />

      <!-- 分类 -->
      <Droplist v-model="params.categoryId" label="分类" placeholder="请选择分类" :columns="getAnniversary('categoryList')"
        :columns-field-names="{ text: 'name', value: 'id' }" />

      <!-- 目标日 -->
      <Suspense>
        <target-time ref="target_time" v-model="params.targetTime" label="目标日" placeholder="请选择目标日"
          v-model:type="params.calendarType">
        </target-time>

        <template #fallback>
          <Skeleton>
            <div class="paragraph"></div>
          </Skeleton>
        </template>
      </Suspense>
      <div class="tips">提示：选择未来日期倒数，选择过去日期正数</div>

      <!-- 重复 -->
      <Droplist v-model="params.repeatId" label="重复" placeholder="请选择重复" :columns="getSystem('repeatList')"
        :columns-field-names="{ text: 'name', value: 'id' }" />

      <!-- 提醒时间 -->
      <Suspense>
        <reminder-time ref="reminder_time" v-model:id="params.reminderId" v-model:time="params.reminderTime" label="提醒时间"
          placeholder="请选择提醒时间"></reminder-time>

        <template #fallback>
          <Skeleton>
            <div class="paragraph"></div>
          </Skeleton>
        </template>
      </Suspense>

      <!-- 是否置顶 -->
      <van-cell title="是否置顶" :border="false" center>
        <template #right-icon>
          <van-switch v-model="params.sign" size=".8rem" :active-value="1" :inactive-value="2" />
        </template>
      </van-cell>

      <!-- 备注 -->
      <van-field v-model="params.remarks" label="备注" type="textarea" maxlength="100" placeholder="请输入备注" :border="false"
        clearable :autosize="{ minHeight: 0.8 * getApp('fontSize') * 3, maxHeight: 0.8 * getApp('fontSize') * 3 }"
        show-word-limit @keyup.enter="submit" />

      <van-button text="确定" :color="getApp('primaryColor')" :block="true" :round="true" :loading="getApp('loading')"
        @click.stop="submit"></van-button>
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
  filter: blur(.08rem);
}

.purple {
  top: calc(var(--app-status-bar) + 7.36rem);
  left: 0;
  background: rgba(249, 237, 255, 0.5);
}

.blue {
  right: 0;
  @include bottom(4.04rem);
  background: rgba(235, 245, 255, 0.5);
}

.yellow {
  left: 0;
  @include bottom();
  background: rgba(255, 245, 227, 0.5);
}

.frm {
  position: relative;
  padding: 0 .6rem;

  .paragraph {
    margin: .48rem .6rem;
    height: .8rem;
    background: var(--van-active-color);
  }

  &:deep(.van-cell) {
    --van-cell-vertical-padding: .48rem;
    --van-cell-horizontal-padding: .6rem;
    --van-cell-font-size: .56rem;
    --van-cell-line-height: .8rem;
    --van-field-label-color: rgba(51, 51, 51, 1);
    --van-cell-background: var(--meng-inverse-placeholder);
    --van-switch-on-background: var(--meng-primary-color);
    margin: .48rem 0;
    border-radius: .16rem;
  }

  .tips {
    margin-top: -0.16rem;
    @include tx(.48rem);
    color: #F56C6C;
  }

  >button {
    margin-top: 2.4rem;
    --van-button-default-height: 1.92rem;
    --van-button-default-line-height: 1.92rem;
    --van-button-normal-font-size: .64rem;
  }
}
</style>
