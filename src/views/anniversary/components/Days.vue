<script setup>
import { ref, toRef, computed } from 'vue'
import { useStore } from 'vuex'
import { getTime } from '@utils/index'
import { Topping, DeleteAnniversaryById } from '@api/anniversary'
import { showSuccessToast, showConfirmDialog } from 'vant'
import { AddBehavior } from '@api/index'

const props = defineProps({
  anniversary: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['refresh'])

const category = toRef(props.anniversary, 'category')

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)

// 纪念日的dom实例
const day = ref(null)

// 目标日
const targetTime = computed(() => {
  let time = dayjs(props.anniversary.targetTime)
  if (props.anniversary.calendarType == 1) {
    // 阳历
    time = time.format('YYYY-MM-DD')
  } else if (props.anniversary.calendarType == 2) {
    // 农历
    time = Calendar.toLunar(time.year(), time.month() + 1, time.date())
    time = `${time[3]}年(${time[0]})${time[5]}${time[6]}`
  }
  return time
})

// 目标日距今差多少天
const range = computed(() => {
  let range = {}
  // 目标日的时间戳
  const target = dayjs(props.anniversary.targetTime).unix()
  // 今天的时间戳
  const today = dayjs().unix()
  // 得到两个时间的秒数差
  const stamp = target - today
  if (stamp > 0) {
    range.just = 1
  } else if (stamp < 0) {
    range.just = 2
  }
  // 获取时间差
  const obj = getTime(Math.abs(stamp)).day || 0
  if (obj == 0) range.just = 3
  range.day = obj
  if (range.just != 3) {
    range.day += 1
  }
  return range
})

// 按钮的文字
const btnTxt = computed(() => {
  if (props.anniversary.sign == 1) {
    return '取消置顶'
  } else {
    return '置顶'
  }
})

/**
 * 修改样式
 */
const setDays = type => {
  if (type == 1) {
    day.value.style['border-radius'] = 0
  } else if (type == 2) {
    day.value.style['border-radius'] = '10px'
  }
}

/**
 * 置顶或取消置顶事件
 */
const topping = async () => {
  try {
    await store.dispatch('server/GetTimestamp', '/anniversary/topping')
    await Topping({
      data: {
        id: props.anniversary.id,
        sign: props.anniversary.sign == 1 ? 2 : 1
      },
      time: getServer.value('systemTime'),
      sign: 'md5'
    })
    showSuccessToast(props.anniversary.sign == 1 ? '取消置顶成功' : '置顶成功')
    emit('refresh')
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
          remarks: `删除ID为${props.anniversary.id}的纪念日`
        })
      } catch { }
      try {
        await store.dispatch('server/GetTimestamp', '/anniversary/delete')
        const res = await DeleteAnniversaryById({
          data: props.anniversary.id,
          time: getServer.value('systemTime'),
          sign: 'sha256'
        })
        showSuccessToast(res)
        emit('refresh')
      } catch { }
    })
    .catch(() => { })
}
</script>

<template>
  <van-swipe-cell class="day" :stop-propagation="true" @open="setDays(1)" @close="setDays(2)">
    <div ref="day" class="content" :style="{ '--meng-category-color': category.color }"
      v-stat="{ type: 4, page: '/home/anniversary', remarks: `查看纪念日ID为${anniversary.id}的纪念日详情` }"
      @click.stop="$router.push(`/anniversary/details/${anniversary.id}`)">
      <div class="round"></div>
      <div class="head">
        <div class="title">{{ anniversary.title }}</div>
        <div class="category">{{ anniversary.category.name }}</div>
      </div>
      <div class="remarks">
        <span>{{ anniversary.remarks }}</span>
        <span class="tips" v-if="!anniversary.remarks">说点什么吧</span>
      </div>
      <div class="target_date">目标日：{{ targetTime }}</div>
      <div class="countdown">
        <div class="time">
          <span v-if="range.just == 1">还有</span>
          <span v-if="range.just == 2">已经</span>
          <span class="special" v-if="range.just != 3">{{ range.day }}</span>
          <span class="special" v-else>今</span>
          <span>天</span>
        </div>
        <div class="tips">距离目标日</div>
      </div>
      <div class="sign" v-if="anniversary.sign == 1">
        <i class="iconfont" :class="category.icon"></i>
      </div>
    </div>
    <template #right>
      <van-button class="btn" color="#409EFF" :square="true"
        v-stat="{ type: 2, page: '/home/anniversary', remarks: `${btnTxt}ID为${anniversary.id}的纪念日` }"
        @click.stop="topping">{{ btnTxt }}</van-button>

      <van-button class="btn" color="#F1883B" :square="true"
        v-stat="{ type: 3, page: '/home/anniversary', remarks: '跳转到编辑纪念日页面' }"
        @click.stop="$router.push(`/anniversary/update/${anniversary.id}/1`)">编辑</van-button>

      <van-button class="btn" type="danger" :square="true"
        v-stat="{ type: 5, page: '/home/anniversary', remarks: `是否删除ID为${anniversary.id}的纪念日` }"
        @click.stop="Delete">删除</van-button>
    </template>
  </van-swipe-cell>
</template>

<style lang="scss" scoped>
.day {
  position: relative;
  margin: .48rem .6rem;

  .content {
    position: relative;
    padding: .6rem .48rem;
    border-radius: .4rem;
    background: var(--meng-inverse-placeholder);

    .round {
      position: absolute;
      right: -1.6rem;
      bottom: -1.6rem;
      @include size(3.2rem);
      border-radius: 50%;
      background: rgba(242, 248, 255, 1);
    }

    .head {
      width: calc(100% - 1.6rem);
      @include flex($align: center);

      .title {
        max-width: 50%;
        @include tx(.64rem);
        color: var(--meng-primary-color);
        @include omit(1);
      }

      .category {
        margin-left: .16rem;
        padding: .08rem .28rem;
        max-width: calc(50% - 4px);
        @include tx(.48rem);
        color: var(--meng-category-color);
        @include omit(1);
        border: 1px solid var(--meng-category-color);
        border-radius: 15px;
      }
    }

    .remarks {
      position: relative;
      padding: .48rem 0;
      @include size(60%, 2.48rem);
      @include tx(.48rem, .56rem);
      color: #303133;
      letter-spacing: 1px;
      @include omit(3);

      .tips {
        color: #909399;
      }
    }

    .target_date {
      @include tx(.52rem);
      color: rgba(112, 112, 112, 1);
    }

    .countdown {
      position: absolute;
      right: .6rem;
      bottom: .6rem;
      width: 38%;

      .time {
        @include tx(.48rem);
        color: var(--meng-primary-color);
        text-align: right;
        letter-spacing: 1px;

        .special {
          @include tx(1.12rem);
        }
      }

      .tips {
        padding-top: .32rem;
        @include tx(.48rem);
        color: rgba(153, 153, 153, 1);
        text-align: right;
      }
    }

    .sign {
      position: absolute;
      top: 0;
      right: .6rem;
      background: var(--meng-category-color);
      @include size(1.2rem, 1.8rem);
      @include flex($justify: center);

      &::after {
        position: absolute;
        left: 0;
        bottom: 0;
        content: "";
        border-bottom: .48rem solid var(--meng-inverse-color);
        border-left: .6rem solid transparent;
        border-right: .6rem solid transparent;
      }

      >i {
        margin-top: .2rem;
        @include tx(1rem);
        color: var(--meng-inverse-color);
      }
    }
  }

  .btn {
    height: 100%;
    line-height: 100%;
  }
}
</style>
