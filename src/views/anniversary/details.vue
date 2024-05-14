<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { FindAnniversaryById } from '@api/anniversary'
import { getTime } from '@utils/index'

// 获取路由对象
const route = useRoute()

// 纪念日的id
const id = ref(Number(route.params.id) || 0)
const anniversary = ref({})
// 距今是历史还是未来
const range = reactive({
  just: null,
  time: null
})

/**
 * 获取纪念日信息
 */
const findAnniversaryById = async () => {
  try {
    const res = await FindAnniversaryById(id.value)
    anniversary.value = JSON.parse(Dense.decrypt(res))
    // 目标日的时间戳
    const target = dayjs(anniversary.value.targetTime).unix()
    // 今天的时间戳
    const today = dayjs().unix()
    // 得到两个时间的秒数差
    const s = target - today
    if (s > 0) {
      range.just = 1
      range.time = Math.abs(s) * 1000
    } else if (s <= 0) {
      range.just = 2
      range.time = Math.abs(s)
      timely()
    }
  } catch { }
}

const time = ref({})
const interval = ref(null)

// 顺计时
const timely = () => {
  time.value = getTime(range.time);
  interval.value = setInterval(() => {
    range.time++
    time.value = getTime(range.time)
  }, 1000)
}

// 目标日
const targetTime = computed(() => {
  if (!anniversary.value?.targetTime) return ''
  let time = dayjs(anniversary.value.targetTime)
  if (anniversary.value.calendarType == 1) {
    // 阳历
    time = time.format('YYYY-MM-DD')
  } else if (anniversary.value.calendarType == 2) {
    // 农历
    time = Calendar.toLunar(time.year(), time.month() + 1, time.date())
    time = `${time[3]}年(${time[0]})${time[5]}${time[6]}`
  }
  return time
})

const spell = num => {
  if (num < 10) {
    return `0${num}`
  } else {
    return num
  }
}

findAnniversaryById()
</script>

<template>
  <Layout>
    <template #right>
      <van-icon name="edit" size="0.72rem" v-stat="{ type: 3, page: route.path, remarks: '跳转到编辑纪念日页面' }"
        @click.stop="$router.push(`/anniversary/update/${anniversary.id}/2`)" />
    </template>

    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="main">
      <div class="round"></div>

      <div class="title">
        <div class="icon"></div>
        <div class="txt">基本信息</div>
      </div>
      <div class="field">
        <span class="tit">标题：</span>
        <span class="txt">{{ anniversary.title }}</span>
      </div>
      <div class="field">
        <span class="tit">分类：</span>
        <span class="txt">{{ anniversary?.category?.name }}</span>
      </div>
      <div class="field">
        <span class="tit">目标日：</span>
        <span class="txt">{{ targetTime }}</span>
      </div>
      <div class="field">
        <span class="tit">备注：</span>
        <span class="txt">{{ anniversary.remarks }}</span>
      </div>

      <div class="title">
        <div class="icon"></div>
        <div class="txt">倒计时</div>
      </div>

      <van-count-down :time="range.time" v-if="range.just == 1">
        <template #default="timeData">
          <template v-if="timeData.days > 0">
            <span class="num">{{ timeData.days }}</span>
            <span> 天 </span>
          </template>
          <span class="num">{{ spell(timeData.hours) }}</span>
          <span> 时 </span>
          <span class="num">{{ spell(timeData.minutes) }}</span>
          <span> 分 </span>
          <span class="num">{{ spell(timeData.seconds) }}</span>
          <span> 秒</span>
        </template>
      </van-count-down>
      <div class="van-count-down" v-if="range.just == 2">
        <template v-if="time.day > 0">
          <span class="num">{{ time.day }}</span>
          <span> 天 </span>
        </template>
        <span class="num">{{ spell(time.hour) }}</span>
        <span> 时 </span>
        <span class="num">{{ spell(time.minute) }}</span>
        <span> 分 </span>
        <span class="num">{{ spell(time.second) }}</span>
        <span> 秒</span>
      </div>

      <div class="title">
        <div class="icon"></div>
        <div class="txt">提醒设置</div>
      </div>

      <div class="field">
        <span class="tit">重复周期：</span>
        <span class="txt">{{ anniversary?.repeat?.name }}</span>
      </div>

      <div class="field">
        <span class="tit">重复时间：</span>
        <span class="txt">{{
          anniversary?.reminderTime ? anniversary.reminderTime : anniversary?.reminder?.name
        }}</span>
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
  filter: blur(0.16rem);
}

.purple {
  top: calc(var(--app-status-bar) + 7.12rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(4.04rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom();
  background: rgba(255, 245, 227, 1);
}

.main {
  position: relative;
  margin: .6rem;
  padding: .24rem .4rem .48rem;
  border-radius: .4rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
  overflow: hidden;

  .round {
    position: absolute;
    top: -1.6rem;
    right: -1.6rem;
    @include size(3.2rem);
    border-radius: 50%;
    background: rgba(242, 248, 255, 1);
  }

  .title {
    padding: .32rem 0;
    @include flex($align: center);

    .icon {
      @include size(.16rem, .48rem);
      border-radius: 8.36rem;
      background: var(--meng-primary-color);
    }

    .txt {
      margin-left: .24rem;
      @include tx(.56rem, .8rem);
      color: rgba(51, 51, 51, 1);
      font-weight: 500;
    }
  }

  .field {
    padding: .16rem .4rem;
    @include tx(.56rem, .8rem);

    .tit {
      color: rgba(153, 153, 153, 1);
    }

    .txt {
      color: rgba(51, 51, 51, 1);
    }
  }

  &:deep(.van-count-down) {
    padding: .16rem .4rem;
    @include tx(.64rem, .96rem);
    color: rgba(153, 153, 153, 1);

    .num {
      color: var(--meng-primary-color);
    }
  }
}
</style>
