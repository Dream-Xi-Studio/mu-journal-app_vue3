<script setup>
import { ref } from 'vue'

defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['submit'])

// 是否显示修改性别弹层
const show = ref(false)
// 参数
const gender = ref(0)

/**
 * 显示修改性别弹层
 */
const showUpdateGender = param => {
  gender.value = param || 0
  show.value = true
}

/**
 * 修改性别
 */
const updateGender = async () => {
  if (!gender.value) return mui.toast('请选择性别')
  show.value = false
  emit('submit', { gender: gender.value })
}
</script>

<template>
  <!-- 性别 -->
  <van-cell title="性别" :value="item.gender == 1 && '男' || item.gender == 2 && '女' || '未知'" :is-link="true" :center="true"
    v-stat="{ type: 6, page: '/personalData', remarks: '显示修改性别弹窗' }" @click.stop="showUpdateGender(item.gender)" />

  <!-- 修改性别弹层 -->
  <van-popup v-model:show="show" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <div class="main">
      <div class="title">修改性别</div>
      <van-radio-group v-model="gender">
        <van-cell-group :border="false">
          <van-cell title="男" clickable @click.stop="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click.stop="gender = 2">
            <template #right-icon>
              <van-radio :name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="btns">
        <van-button :block="true" :plain="true" :square="true" @click.stop="show = false">取消</van-button>
        <van-button :block="true" :plain="true" :square="true"
          v-stat="{ type: 2, page: '/personalData', remarks: `修改性别为${gender == 1 && '男' || gender == 2 && '女'}` }"
          @click.stop="updateGender">确定</van-button>
      </div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.main {
  width: 70vw;

  .title {
    position: relative;
    padding: .8rem .6rem;
    @include tx(.64rem, .88rem);
    font-weight: bold;
    color: var(--meng-primary-color);
    @include line(bottom, .6rem, .6rem, $color: #f0f0f0);
  }

  &:deep(.van-cell) {
    padding: .6rem;
    @include tx(.56rem, .8rem);
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
