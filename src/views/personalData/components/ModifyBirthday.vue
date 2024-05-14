<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { getSolarCalendar, getLunarCalendar } from '@utils/index'

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['submit'])

// 获取store对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)

// 生日
const birthday = computed(() => {
  if (!props.item.birthday) return
  let time = dayjs(props.item.birthday)
  if (props.item.calendarType == 1) {
    // 阳历
    time = time.format('YYYY-MM-DD')
  } else if (props.item.calendarType == 2) {
    // 农历
    time = Calendar.toLunar(time.year(), time.month() + 1, time.date())
    time = `${time[3]}年(${time[0]})${time[5]}${time[6]}`
  }
  return time
})

// 是否显示选择弹框
const show = ref(false)
// 参数
const params = reactive({
  calendarType: 0,
  birthday: ''
})

const solarCalendar = ref([])
const lunarCalendar = ref([])
const solarList = ref([])
const lunarList = ref([])

/**
 * 显示修改生日弹层
 */
const showUpdateBirthday = async (type, birthday) => {
  params.calendarType = type
  params.birthday = birthday
  await initDate(type, birthday)
  show.value = true
}

/**
 * 设置日期选择值
 */
const initDate = async (type, birthday) => {
  let date = dayjs()
  if (birthday) date = dayjs(birthday, 'YYYY-MM-DD')
  if (type == 1) {
    solarList.value = [date.year(), date.month() + 1, date.date()]
  } else {
    const lunarDate = Calendar.toLunar(date.year(), date.month() + 1, date.date())
    lunarList.value = [lunarDate[0], lunarDate[1], lunarDate[2]]
  }
}

/**
 * 阳历选项改变时触发
 */
const changeSolarList = ({ selectedOptions }) => {
  params.birthday = selectedOptions.map(item => item.value).join('-')
}

/**
 * 农历选项改变时触发
 */
const changeLunarList = ({ selectedOptions }) => {
  const date = Calendar.toSolar(
    selectedOptions[0].value,
    selectedOptions[1].value,
    selectedOptions[2].value
  )
  params.birthday = date.join('-')
}

/**
 * 修改生日
 */
const updateBirthday = async () => {
  if (!params.birthday) return mui.toast('请选择生日')
  show.value = false
  emit('submit', params)
}

solarCalendar.value = await getSolarCalendar(0)
lunarCalendar.value = await getLunarCalendar(0)
</script>

<template>
  <!-- 生日 -->
  <van-cell title="生日" :value="birthday" :is-link="true" :center="true"
    v-stat="{ type: 6, page: '/personalData', remarks: '显示修改生日弹窗' }"
    @click.stop="showUpdateBirthday(item.calendarType, item.birthday)" />

  <!-- 修改生日弹层 -->
  <van-popup v-model:show="show" position="bottom" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <!-- 阳历 -->
    <van-picker class="picker" v-model="solarList" :columns="solarCalendar" item-height="1.76rem"
      @change="changeSolarList" v-show="params.calendarType == 1">
      <template #toolbar>
        <span :class="{ active: params.calendarType == 1 }" v-stat="{ type: 8, page: '/personalData', remarks: '点击阳历' }"
          @click.stop="showUpdateBirthday(1, params.birthday)">阳历</span>

        <span :class="{ active: params.calendarType == 2 }" v-stat="{ type: 8, page: '/personalData', remarks: '点击农历' }"
          @click.stop="showUpdateBirthday(2, params.birthday)">农历</span>
      </template>

      <template #columns-bottom>
        <div class="btns">
          <van-button :color="getApp('primaryColor')" text="取消" :square="true" :plain="true" @click.stop="show = false" />

          <van-button :color="getApp('primaryColor')" text="确定" :square="true"
            v-stat="{ type: 2, page: '/personalData', remarks: '点击修改生日' }" @click.stop="updateBirthday" />
        </div>
      </template>
    </van-picker>

    <!-- 农历 -->
    <van-picker class="picker" v-model="lunarList" :columns="lunarCalendar" item-height="1.76rem"
      @change="changeLunarList" v-show="params.calendarType == 2">
      <template #toolbar>
        <span :class="{ active: params.calendarType == 1 }" v-stat="{ type: 8, page: '/personalData', remarks: '点击阳历' }"
          @click.stop="showUpdateBirthday(1, params.birthday)">阳历</span>

        <span :class="{ active: params.calendarType == 2 }" v-stat="{ type: 8, page: '/personalData', remarks: '点击农历' }"
          @click.stop="showUpdateBirthday(2, params.birthday)">农历</span>
      </template>

      <template #columns-bottom>
        <div class="btns">
          <van-button :color="getApp('primaryColor')" text="取消" :square="true" :plain="true" @click.stop="show = false" />

          <van-button :color="getApp('primaryColor')" text="确定" :square="true"
            v-stat="{ type: 2, page: '/personalData', remarks: '点击修改生日' }" @click.stop="updateBirthday" />
        </div>
      </template>
    </van-picker>
  </van-popup>
</template>

<style lang="scss" scoped>
.picker {
  &:deep(.van-picker__toolbar) {
    margin: auto;
    @include size(40%, 1.76rem);

    >span {
      padding: .24rem .4rem;
      @include tx(.56rem);
      color: #303133;

      &.active {
        color: var(--meng-primary-color);
        border: 0.04rem solid;
        border-radius: 0.24rem;
      }
    }
  }

  .btns {
    position: relative;
    padding: .48rem .8rem;
    @include flex(space-between, center);

    >button {
      @include size(45%, 1.6rem);
      border-radius: 0.8rem;
    }
  }
}
</style>
