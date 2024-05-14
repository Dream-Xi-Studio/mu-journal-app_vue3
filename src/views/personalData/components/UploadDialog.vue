<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Upload from '@server/upload'
import * as imageConversion from 'image-conversion'
import { getBaseURL } from '@utils/index'
import { showFailToast } from 'vant'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  token: String,
  address: String
})

const emit = defineEmits(['update:show', 'success'])

// 是否显示上传图片弹层
const Show = computed({
  get: () => {
    return props.show
  },
  set: (val) => {
    emit('update:show', val)
  }
})

const router = useRouter()
// 获取store对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)

// 电脑端上传图片实例
const upload = ref(null)
const uploadKey = ref(Symbol())

/**
 * 触发上传事件
 */
const uploadClick = () => {
  upload.value.click()
}

/**
 * 上传图片，修改头像
 */
const uploadFileChange = async event => {
  let file = event.target.files[0] || {}
  if (file.size > 1048576) {
    const res = await imageConversion.compressAccurately(event, 888).catch(() => {
      mui.toast('图片大小不能大于1MB')
    })
    file = new File([res], file.name, {
      type: res.type,
      lastModified: Date.now()
    })
  }
  try {
    const param = new FormData()
    param.append('file', file)
    param.append('path', props.address)
    const res = await Upload(param)
    emit('success', res)
  } finally {
    uploadKey.value = Symbol()
  }
}

/**
 * 拍照
 */
const getImage = () => {
  Show.value = false
  mui.plusReady(() => {
    const option = {
      filename: `_doc/mu-journal/Camera/${dayjs().valueOf()}`,
      format: 'png',
      index: 1
    }
    if (props.address == 'picture') {
      option.crop = {
        width: 180,
        height: 180,
        saveToAlbum: true
      }
    }
    const camera = plus.camera.getCamera()
    camera.captureImage(path => {
      // 通过URL参数获取目录对象或文件对象
      plus.io.resolveLocalFileSystemURL(path, async entry => {
        const url = `${entry.toLocalURL()}?version=${dayjs().valueOf()}`
        await compressImage(url)
      }, e => {
        mui.toast(e.message)
      })
    }, error => {
      mui.toast(error.message)
    }, option)
  })
}

/**
 * 相册选取图片
 */
const galleryImg = () => {
  Show.value = false
  mui.plusReady(() => {
    const option = {
      filename: '_doc/mu-journal/Gallery/',
      filter: 'image',
      maximum: 1,
      multiple: false,
      permissionAlert: true
    }
    if (props.address == 'picture') {
      option.crop = {
        width: 180,
        height: 180,
        saveToAlbum: true
      }
    }
    plus.gallery.pick(path => {
      // 通过URL参数获取目录对象或文件对象
      plus.io.resolveLocalFileSystemURL(path, async entry => {
        const url = `${entry.toLocalURL()}?version=${dayjs().valueOf()}`
        await compressImage(url)
      }, e => {
        mui.toast(e.message)
      })
    }, error => {
      mui.toast(error.message)
    }, option)
  })
}

/**
 * 压缩图片
 */
const compressImage = async url => {
  plus.zip.compressImage({
    src: url,
    dst: url,
    overwrite: true,
    format: 'png',
    quality: 80
  }, event => {
    const upload = plus.uploader.createUpload(`${getBaseURL()}/api/upload`, {
      method: 'POST'
    }, (upload, status) => {
      if (status == 201) {
        emit('success', upload.responseText)
      } else if (status == 401) {
        showFailToast('身份验证失败，请重新登录')
        store.dispatch('user/LogOut')
        router.replace('/excessive')
      } else {
        mui.toast('上传失败')
      }
    })
    if (props.token) {
      upload.setRequestHeader('Authorization', `Bearer ${props.token}`)
    }
    upload.addFile(event.target, { key: 'file' })
    upload.addData('path', props.address)
    upload.start()
  }, error => {
    mui.toast(error.message)
  })
}

defineExpose({
  uploadClick
})
</script>

<template>
  <input :key="uploadKey" ref="upload" type="file" accept="image/*" v-show="false" @change="uploadFileChange($event)" />
  <van-popup v-model:show="Show" position="bottom" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <div class="btns">
      <van-cell title="拍照" title-style="text-align: center" v-stat="{ type: 2, page: '/personalData', remarks: '点击拍照' }"
        @click.stop="getImage" />

      <van-cell title="从手机相册选择" title-style="text-align: center"
        v-stat="{ type: 2, page: '/personalData', remarks: '点击从手机相册选择' }" @click.stop="galleryImg" />
    </div>
    <div class="bg"></div>
    <van-button class="cancel" text="取消" :color="getApp('inverseColor')" :block="true" :square="true"
      @click.stop="Show = false"></van-button>
  </van-popup>
</template>

<style lang="scss" scoped>
.btns {
  &:deep(.van-cell) {
    --van-cell-vertical-padding: .48rem;
    --van-cell-horizontal-padding: .64rem;
    @include tx(.56rem, .8rem);
  }
}

.bg {
  height: 0.32rem;
  background: rgba(247, 248, 250, 1);
}

.cancel {
  height: 2rem;
  line-height: 2rem;

  &:deep(span) {
    @include tx(.64rem);
    color: var(--meng-primary-color);
  }
}
</style>
