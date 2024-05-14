<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // 设置头像的大小
  size: {
    type: [String, Number],
    default: '32px'
  },

  // 设置头像的形状：circle和square
  shape: {
    type: String,
    default: 'circle'
  },

  // 图片头像的资源地址
  src: String,

  // 图像无法显示时的替代文本
  alt: String,

  // 主题色
  primaryColor: String,
  inverseColor: String
})

// 定义当前头像的图片地址，初始值为父组件的src
const url = ref(props.src || '')

// 头像大小
const Size = computed(() => {
  if (typeof props.size === 'number') {
    return props.size + 'px'
  } else if (typeof props.size === 'string') {
    if (!isNaN(Number(props.size))) {
      return props.size + 'px'
    }
    return props.size
  } else {
    return '32px'
  }
})

// 字体大小
const fontSize = computed(() => {
  if (typeof props.size === 'number') {
    return props.size * 0.4 + 'px'
  } else if (typeof props.size === 'string') {
    if (!isNaN(Number(props.size))) {
      return props.size * 0.4 + 'px'
    }
    let num = props.size.replace(/[^\d.]/g, '')
    let unit = props.size.replace(/[\d.]/g, '')
    return num * 0.4 + unit
  } else {
    return 32 * 0.4 + 'px'
  }
})

// 文本转成颜色HEX值
const textColor = (txt = '') => {
  let color = []
  let from,
    len = 3
  if (txt.length <= 3) {
    from = 0
  } else if (txt.length > 12) {
    from = 6
  } else {
    from = 4
  }
  for (let i = from; i < from + len; i++) {
    let code = ''
    code = txt.charCodeAt(i) + ''
    code = parseInt(code.substr(0, 3))
    color.push(code ? parseInt(code * 0.5) : 255 - 220)
  }
  return `#${color[0].toString(16)}${color[1].toString(16)}${color[2].toString(16)}`
}

// 字符串倒序
const textReverse = (txt = '') => {
  return txt.split('').reverse().join('')
}

// 字体颜色
const color = computed(() => {
  if (!props.alt) return
  return textColor(textReverse(props.alt))
})

// 背景颜色
const bgColor = computed(() => {
  if (!props.alt) return
  return textColor(props.alt)
})

/**
 * 获取颜色的rgb对应的值数组
 * @param {String} params 16进制颜色
 */
const getRGB = params => {
  params = parseInt(params.substring(1), 16)
  const r = params >> 16
  const g = (params - (r << 16)) >> 8
  const b = params - (r << 16) - (g << 8)
  return [r, g, b]
}

// 判断两个颜色是否相近
const colorOverlap = computed(() => {
  if (!props.alt) return
  const [r1, g1, b1] = getRGB(color.value)
  const [r2, g2, b2] = getRGB(bgColor.value)
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < 50
})

// 判断图片链接是否有效
const checkImgExists = url => {
  return new Promise((resolve, reject) => {
    const imgObj = new Image()
    imgObj.src = url
    imgObj.onload = (res) => {
      resolve(res)
    }
    imgObj.onerror = (err) => {
      reject(err)
    }
  })
}

// 监听父组件的src，并判断是否有效，有效才赋值给url
watch(
  () => props.src,
  () => {
    if (!props.src) return (url.value = '')
    checkImgExists(url.value)
      .then(() => {
        url.value = props.src
      })
      .catch(() => {
        url.value = ''
      })
  }
)
</script>

<template>
  <div class="avatar"
    :style="{ width: Size, height: Size, fontSize: fontSize, lineHeight: fontSize, color: colorOverlap ? inverseColor : color, borderRadius: (shape == 'circle' && '50%') || (shape == 'square' && 0), backgroundColor: colorOverlap ? primaryColor : bgColor }">
    <img :src="url" :style="{ borderRadius: (shape == 'circle' && '50%') || (shape == 'square' && 0) }" v-if="url" />
    <template v-else>
      <span v-if="alt">{{ alt.substr(0, 1).toUpperCase() }}</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  @include flex(center, center);

  >img {
    display: block;
    @include size(100%);
  }
}
</style>
