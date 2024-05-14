<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

// 获取store对象
const store = useStore()
const getSystem = computed(() => store.getters.getSystem)

const props = defineProps({
  id: [String, Number],

  time: String,

  // 输入框上面文本
  label: String,

  // 占位提示文字
  placeholder: String
})

const emit = defineEmits(['update:id', 'update:time'])

const Id = computed({
  get: () => {
    return props.id
  },
  set: (val) => {
    emit('update:id', val)
  }
})

const Time = computed({
  get: () => {
    return props.time
  },
  set: (val) => {
    emit('update:time', val)
  }
})

// 是否显示选择弹框
const show = ref(false)
// 对象数组，配置每一列显示的数据
const columns = ref([])

/**
 * 初始化数据
 */
const initDate = async () => {
  if (!getSystem.value('reminderList')?.length) {
    await store.dispatch('system/FindReminderAll')
  }
  const reminders = []
  for (let index = 0; index < getSystem.value('reminderList').length; index++) {
    const hours = []
    for (let hour = 0; hour < 24; hour++) {
      const minutes = []
      for (let minute = 0; minute < 60; minute++) {
        let m = {
          text: `${minute < 10 ? '0' + minute : minute}分`,
          value: minute < 10 ? '0' + minute : minute
        }
        if (getSystem.value('reminderList')[index].id == 1) {
          m.disabled = true
        }
        minutes.push(m)
      }
      let h = {
        text: `${hour < 10 ? '0' + hour : hour}时`,
        value: hour < 10 ? '0' + hour : hour,
        children: minutes
      }
      if (getSystem.value('reminderList')[index].id == 1) {
        h.disabled = true
      }
      hours.push(h)
    }
    reminders.push({
      text: getSystem.value('reminderList')[index].name,
      value: getSystem.value('reminderList')[index].id,
      children: hours
    })
  }
  columns.value = reminders
}

const picker = ref(null)
const reminder = ref([])

const setDefault = () => {
  reminder.value = []
  if (Id.value) {
    reminder.value.push(Id.value)
  } else {
    reminder.value.push(1)
  }
  if (Time.value) {
    const time = Time.value.split(':');
    reminder.value.push(time[0])
    reminder.value.push(time[1])
  } else {
    reminder.value.push('00')
    reminder.value.push('00')
  }
  setTimeout(() => {
    const options = picker.value.getSelectedOptions()
    Id.value = options[0].value
    Time.value = `${options[1].value}:${options[2].value}`
    txt.value = options[0].value == 1 ? options[0].text : `${options[0].text}-${options[1].text}:${options[2].text}`
  }, 500)
}

watch(
  () => show.value,
  (val) => {
    if (val) {
      setDefault()
    }
  }
)

const txt = ref('')

// 选项改变时触发，并返回给父组件
const changeOption = ({ selectedOptions }) => {
  Id.value = selectedOptions[0].value
  Time.value = `${selectedOptions[1].value}:${selectedOptions[2].value}`
  txt.value = selectedOptions[0].value == 1 ? selectedOptions[0].text : `${selectedOptions[0].text}-${selectedOptions[1].text}:${selectedOptions[2].text}`
}

onMounted(() => {
  initDate()
})

defineExpose({
  setDefault
})
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
  <van-popup v-model:show="show" position="bottom" :round="true" :close-on-popstate="true"
    :safe-area-inset-bottom="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }">
    <van-picker class="picker" ref="picker" v-model="reminder" :columns="columns" item-height="1.76rem"
      :visible-item-count="5" @change="changeOption">
      <template #toolbar>
        <div>
          <div class="title">提醒时间</div>
          <div class="time" v-if="Id != 1 && Time">{{ Time }}</div>
        </div>
      </template>
    </van-picker>
  </van-popup>
</template>

<style lang="scss" scoped>
.picker {
  &:deep(.van-picker__toolbar) {
    padding: 0.32rem 0;
    height: auto;
    text-align: center;
    justify-content: center;

    .title {
      @include tx(.64rem);
      color: #303133;
    }

    .time {
      padding-top: .2rem;
      @include tx(.48rem);
      color: var(--meng-primary-color);
      letter-spacing: 0.04rem;
    }
  }
}
</style>
