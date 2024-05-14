<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 当前选择的值
  modelValue: Array,

  // 输入框上面文本
  label: String,

  // 占位提示文字
  placeholder: String,

  // 读取对象的名称
  name: {
    type: String,
    default: 'name'
  },

  // 下拉框列表数组
  columns: {
    type: Array,
    default: () => []
  },

  // 自定义 columns 结构中的字段
  columnsFieldNames: {
    type: Object,
    default: () => ({
      text: 'text',
      value: 'value',
      children: 'children'
    })
  }
})

const emit = defineEmits(['update:modelValue'])

// 是否显示选择弹框
const show = ref(false)

// 当前输入框的值
const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('update:modelValue', val)
  }
})

const item = computed(() => {
  return props.columns.find(item => item[props.columnsFieldNames.value] == value.value) || {}
})
</script>

<template>
  <van-field :label="label" :placeholder="placeholder" v-model="item[name]" readonly :border="false"
    @click="show = true">
    <template #button>
      <!-- 右侧图标 -->
      <div class="field__arrow--icon">
        <van-icon :name="show ? 'arrow-up' : 'arrow-down'" size=".8rem" />
      </div>
    </template>
  </van-field>

  <van-popup v-model:show="show" position="bottom" :round="true" :close-on-popstate="true" :closeable="true"
    :safe-area-inset-bottom="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }">
    <van-picker v-model="value" :columns="columns" :columns-field-names="columnsFieldNames" item-height="1.76rem"
      v-if="columns?.length">
      <template #toolbar></template>
    </van-picker>

    <div class="null-droplist" v-else>
      <Empty></Empty>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.field__arrow--icon {
  @include flex($align: center);
}

.null-droplist {
  position: relative;
  height: 12.32rem;

  &:deep(.null) {
    position: absolute;
    padding: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
