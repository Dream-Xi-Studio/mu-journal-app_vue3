<script setup>
import { ref, computed, watch } from 'vue'
import { getSolarCalendar, getLunarCalendar } from '@utils/index'

const props = defineProps({
  // 当前选择的值
  modelValue: String,

  // 当前的日期类型
  type: {
    type: Number,
    default: 1
  },

  // 输入框上面文本
  label: String,

  // 占位提示文字
  placeholder: String
})

const emit = defineEmits(['update:modelValue', 'update:type'])

// 是否显示选择弹框
const show = ref(false)

// 接口需要的值
const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('update:modelValue', val)
  }
})

// 当前的日期类型
const Type = computed({
  get: () => {
    return props.type
  },
  set: (val) => {
    emit('update:type', val)
  }
})

const solarCalendar = ref([])
const lunarCalendar = ref([])
const solarList = ref([])
const lunarList = ref([])
// 当前输入框显示的值
const txt = ref('')

/**
 * 设置日期选择值
 */
const initDate = () => {
  let date = dayjs()
  if (value.value) date = dayjs(value.value, 'YYYY-MM-DD')
  if (Type.value == 1) {
    solarList.value = [date.year(), date.month() + 1, date.date()]
    txt.value = `${date.year()}年${date.month() + 1}月${date.date()}日`
  } else {
    const lunarDate = Calendar.toLunar(date.year(), date.month() + 1, date.date())
    lunarList.value = [lunarDate[0], lunarDate[1], lunarDate[2]]
    txt.value = `${lunarDate[3]}年(${lunarDate[0]})${lunarDate[5]}${lunarDate[6]}`
  }
  value.value = solarList.value.join('-')
}

watch(
  () => show.value,
  (val) => {
    if (val) {
      initDate()
    }
  }
)

watch(
  () => Type.value,
  () => {
    initDate()
  }
)

const changeSolarList = ({ selectedOptions }) => {
  txt.value = selectedOptions.map(item => item.text).join('')
  value.value = selectedOptions.map(item => item.value).join('-')
}

const changeLunarList = ({ selectedOptions }) => {
  const date = Calendar.toSolar(
    selectedOptions[0].value,
    selectedOptions[1].value,
    selectedOptions[2].value
  )
  txt.value = selectedOptions.map(item => item.text).join('')
  value.value = date.join('-')
}

defineExpose({
  initDate
})

solarCalendar.value = await getSolarCalendar(30)
lunarCalendar.value = await getLunarCalendar(30)
</script>

<template>
  <van-field :label="label" :placeholder="placeholder" v-model="txt" readonly :border="false"
    :safe-area-inset-bottom="true" @click="show = true">
    <template #button>
      <!-- 右侧图标 -->
      <div class="field__arrow--icon">
        <van-icon :name="show ? 'arrow-up' : 'arrow-down'" size=".8rem" />
      </div>
    </template>
  </van-field>
  <van-popup v-model:show="show" position="bottom" :round="true" :close-on-popstate="true" :safe-area-inset-bottom="true"
    :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }">
    <!-- 阳历 -->
    <van-picker class="picker" v-model="solarList" :columns="solarCalendar" item-height="1.76rem"
      @change="changeSolarList" v-show="Type == 1">
      <template #toolbar>
        <span :class="{ active: Type == 1 }" @click.stop="Type = 1">阳历</span>
        <span :class="{ active: Type == 2 }" @click.stop="Type = 2">农历</span>
      </template>
    </van-picker>

    <!-- 农历 -->
    <van-picker class="picker" v-model="lunarList" :columns="lunarCalendar" item-height="1.76rem"
      @change="changeLunarList" v-show="Type == 2">
      <template #toolbar>
        <span :class="{ active: Type == 1 }" @click.stop="Type = 1">阳历</span>
        <span :class="{ active: Type == 2 }" @click.stop="Type = 2">农历</span>
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
}
</style>
