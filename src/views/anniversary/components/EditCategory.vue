<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { icons, colors } from '@/system.config'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: String,
  params: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['update:show', 'update:params', 'commit'])

// 获取store对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)

const Show = computed({
  get: () => {
    return props.show
  },
  set: val => {
    emit('update:show', val)
  }
})

const Params = computed({
  get: () => {
    return props.params
  },
  set: val => {
    emit('update:params', val)
  }
})
</script>

<template>
  <van-popup v-model:show="Show" position="bottom" :overlay-style="{ background: 'rgba(31, 31, 31, 0.27)' }" :round="true"
    :lazy-render="false" :close-on-popstate="true" :safe-area-inset-bottom="true">
    <div class="title">{{ title }}</div>
    <div class="field">
      <input type="text" placeholder="请输入分类名称" v-model="Params.name" />
    </div>
    <div class="icons">
      <van-row>
        <van-col span="4" v-for="icon in icons" :key="icon">
          <div class="icon" :style="{ background: icon == Params.icon ? Params.color : '' }"
            v-stat="{ type: 8, page: '/anniversary/category', remarks: `点击了图标为${icon}的按钮` }"
            @click.stop="Params.icon = icon">
            <i class="iconfont" :class="icon"></i>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="label">选择一个颜色</div>
    <div class="colors">
      <van-row>
        <van-col span="4" v-for="color in colors" :key="color">
          <div class="icon" :style="{ background: color }"
            v-stat="{ type: 8, page: '/anniversary/category', remarks: `点击了颜色为${color}的按钮` }"
            @click.stop="Params.color = color">
            <van-icon name="success" size=".8rem" v-if="color == Params.color" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="btns">
      <van-button :color="getApp('primaryColor')" text="取消" :square="true" :plain="true" @click.stop="Show = false" />

      <van-button :color="getApp('primaryColor')" text="确定" :square="true" @click.stop="$emit('commit')" />
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.title {
  position: relative;
  padding: .6rem 0;
  font-size: 15px;
  @include tx(.64rem, .96rem);
  color: rgba(51, 51, 51, 1);
  text-align: center;
}

.field {
  position: relative;
  padding: .2rem .6rem;

  >input {
    padding: .48rem .72rem;
    @include size(100%, 1.76rem);
    @include tx(.56rem, .8rem);
    border-radius: .88rem;
    border: 1px solid rgba(191, 191, 191, 1);
  }
}

.icons,
.colors {
  position: relative;
  margin: .2rem .8rem;

  &:deep(.van-col) {
    margin: .4rem 0;
    @include flex(center);

    .icon {
      @include size(1.44rem);
      border-radius: 50%;
      background: #a6aec7;
      @include center(flex);

      >i {
        @include tx(.8rem);
        color: #fff;
      }
    }
  }
}

.label {
  position: relative;
  padding: 0 .6rem;
  @include tx(.56rem, .8rem);
  color: rgba(153, 153, 153, 1);
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
</style>
