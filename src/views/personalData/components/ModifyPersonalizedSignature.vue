<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['submit'])

// 获取store对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)

// 是否显示修改昵称弹层
const show = ref(false)
// 参数
const personalizedSignature = ref('')

/**
 * 显示修改昵称弹层
 */
const showUpdatePersonalizedSignature = params => {
  personalizedSignature.value = params || ''
  show.value = true
}

/**
 * 修改个性签名
 */
const updatePersonalizedSignature = async () => {
  if (personalizedSignature.value?.length > 50) return mui.toast('个性签名长度不能超过50个字符')
  show.value = false
  emit('submit', { personalizedSignature: personalizedSignature.value })
}
</script>

<template>
  <!-- 个性签名 -->
  <van-cell title="个性签名" :value="item.personalizedSignature || '您还没有签名哦'" :is-link="true" :center="true"
    v-stat="{ type: 6, page: '/personalData', remarks: '显示修改个性签名弹窗' }"
    @click.stop="showUpdatePersonalizedSignature(item.personalizedSignature)" />

  <!-- 修改个性签名弹层 -->
  <van-popup v-model:show="show" position="bottom" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <div class="head">
      <div class="cancel" @click.stop="show = false">取消</div>
      <div class="title">个性签名</div>
      <div class="confirm" v-stat="{ type: 2, page: '/personalData', remarks: `修改个性签名为${personalizedSignature}` }"
        @click.stop="updatePersonalizedSignature">确定</div>
    </div>
    <div class="main">
      <van-field v-model.trim="personalizedSignature" type="textarea" maxlength="50"
        :autosize="{ minHeight: 0.8 * getApp('fontSize') * 3, maxHeight: 0.8 * getApp('fontSize') * 3 }"
        placeholder="用几句话介绍一下自己" show-word-limit @keyup.enter="updatePersonalizedSignature" />
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.head {
  position: relative;
  padding: .64rem .6rem .24rem;
  @include center(flex);

  .title {
    @include tx(.64rem, .96rem);
    font-weight: bold;
  }

  .cancel,
  .confirm {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: .6rem;
    @include tx(.56rem, .88rem);

    &:active {
      opacity: var(--van-active-opacity);
    }
  }

  .cancel {
    left: 0;
    color: var(--van-picker-cancel-action-color);
  }

  .confirm {
    right: 0;
    color: var(--meng-primary-color);
  }
}

.main:deep(.van-field) {
  --van-cell-horizontal-padding: .6rem;
  @include tx(.56rem, .88rem);
}
</style>
