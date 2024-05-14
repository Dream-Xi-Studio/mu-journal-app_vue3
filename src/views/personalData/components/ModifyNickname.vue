<script setup>
import { ref } from 'vue'

defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['submit'])


// 是否显示修改昵称弹层
const show = ref(false)
// 参数
const nickname = ref('')

/**
 * 显示修改昵称弹层
 */
const showUpdateNickname = name => {
  nickname.value = name
  show.value = true
}

/**
 * 修改昵称
 */
const updateNickname = async () => {
  if (!nickname.value) return mui.toast('昵称不能为空')
  if (nickname.value.length > 15) return mui.toast('昵称长度不能超过15个字符')
  show.value = false
  emit('submit', { nickname: nickname.value })
}
</script>

<template>
  <!-- 昵称 -->
  <van-cell title="昵称" :value="item.nickname || item.account" :is-link="true" :center="true"
    v-stat="{ type: 6, page: '/personalData', remarks: '显示修改昵称弹窗' }"
    @click.stop="showUpdateNickname(item.nickname || item.account)" />

  <!-- 修改昵称弹层 -->
  <van-popup v-model:show="show" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <div class="main">
      <div class="title">修改昵称</div>
      <van-field v-model="nickname" maxlength="15" placeholder="请输入昵称" show-word-limit @keyup.enter="updateNickname" />
      <div class="btns">
        <van-button :block="true" :plain="true" :square="true" @click.stop="show = false">取消</van-button>
        <van-button :block="true" :plain="true" :square="true"
          v-stat="{ type: 2, page: '/personalData', remarks: `修改昵称为${nickname}` }"
          @click.stop="updateNickname">确定</van-button>
      </div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.main {
  width: 70vw;

  .title {
    padding: .8rem 0;
    @include tx(.64rem, .88rem);
    font-weight: bold;
    text-align: center;
  }

  &:deep(.van-field) {
    --van-cell-font-size: .56rem;
    margin: .4rem .48rem 1.2rem;
    padding: .32rem .4rem;
    width: auto;
    border-radius: .16rem;
    background: var(--van-cell-border-color);

    .van-field__body {
      margin-right: 1.2rem;
    }

    .van-field__word-limit {
      --van-field-word-limit-color: #c8c9cc;
      --van-field-word-limit-font-size: .48rem;
      --van-field-word-limit-line-height: .96rem;
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 0;
    }
  }

  .btns {
    display: flex;
    flex-wrap: nowrap;

    >button {
      --van-button-default-height: 1.76rem;
      --van-button-default-font-size: .64rem;
    }

    >button:last-child {
      --van-button-default-color: var(--meng-primary-color);
    }
  }
}
</style>
