<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 父组件转递的值
  modelValue: [String, Number],

  // 输入框左侧文本
  label: String,

  // 输入框类型
  type: {
    type: String,
    default: 'text'
  },

  // 占位提示文字
  placeholder: String,

  // 字符限制
  maxlength: Number,

  // 是否启用清除图标，点击清除图标后会清空输入框
  clearable: {
    type: Boolean,
    default: false
  },

  // 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
  clearTrigger: {
    type: String,
    default: 'focus'
  },

  // 右侧密码明暗文转换图标按钮
  passwordIcon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'clear'])

// 输入框类型
const mold = ref(props.type)
// 焦点
const focus = ref(false)

// 当前输入框的值
const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('update:modelValue', val)
  }
})

// 是否显示清除按钮
const showClear = computed(() => {
  if (props.clearable) {
    let hasValue = props.modelValue?.length != 0
    let trigger = props.clearTrigger === 'always' || props.clearTrigger === 'focus' && focus.value
    return hasValue && trigger
  }
  return false
})

// 获得焦点事件
const returnFocus = (event) => {
  focus.value = true
  emit('focus', event)
}

// 失去焦点事件
const returnBlur = (event) => {
  focus.value = false
  emit('blur', event)
}

// 清除文本框
const eliminate = () => {
  emit('update:modelValue', '')
  emit('clear')
}

// 密码框的明密转换
const changeMold = () => {
  if (mold.value == 'password') {
    mold.value = 'text'
  } else {
    mold.value = 'password'
  }
}
</script>

<template>
  <div class="field" :class="{ focus }">
    <div class="field__label">{{ label }}</div>
    <!-- 输入框 -->
    <div class="field__value">
      <div class="field__body">
        <input :type="mold" class="field__control" :placeholder="placeholder" v-model.trim="value"
          :maxlength="maxlength" @focus="returnFocus" @blur="returnBlur" />
        <!-- 清除icon -->
        <div class="icon" v-if="showClear">
          <van-icon name="clear" @touchstart="eliminate" @click.stop="eliminate" />
        </div>
        <!-- 密码框明密文转换icon -->
        <div class="icon" v-if="passwordIcon">
          <i :class="[
            'iconfont',
            { 'mj-closed-eye': mold == 'password' },
            { 'mj-eye-o': mold != 'password' }
          ]" @click="changeMold"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  position: relative;
  padding: .4rem 0;
  width: 100%;
  @include tx(.56rem, .84rem);
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #707070;
  display: flex;
  @include line(bottom, $width: 0.04rem, $color: #F3F3F3);

  &::after {
    transition: all .4s;
  }

  &.focus {
    color: var(--meng-primary-color);

    &::after {
      border-color: var(--meng-primary-color);
    }
  }

  &__label {
    width: 4rem;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
  }

  &__value {
    position: relative;
    vertical-align: middle;
    word-wrap: break-word;
    flex: 1;
    overflow: visible;

    .field__body {
      @include flex($align: center);

      .field__control {
        padding: 0 0.4rem;
        display: block;
        @include size(100%, .8rem);
        min-width: 0;
        line-height: inherit;
        resize: none;
        border: 0;
        letter-spacing: 0.04rem;
        background-color: transparent;

        &::-webkit-input-placeholder {
          color: #AFAFAF;
        }
      }

      .icon {
        padding: 0 0.2rem;
        @include flex($align: center);

        >i {
          @include tx(.8rem);
        }
      }
    }
  }
}
</style>
