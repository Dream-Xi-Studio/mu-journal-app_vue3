<script setup>
import { defineAsyncComponent, ref, toRef, computed } from 'vue'
import { useStore } from 'vuex'
import { colorFade } from '@utils/index'
import { UpdateAvatar } from '@api/user'
import { showImagePreview, showSuccessToast } from 'vant'

const UploadDialog = defineAsyncComponent(() => import('./UploadDialog.vue'))

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  systemTime: [String, Number],
  baseURL: String
})

// 头像对象
const avatar = toRef(props.item, 'avatar')

// 获取store对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)

// 头像路径
const avatarUrl = computed(() => {
  if (avatar.value?.status == 1) {
    return `${props.baseURL}${avatar.value.image}`
  } else {
    return ''
  }
})

/**
 * 查看头像
 */
const openAvatar = () => {
  if (!avatar.value?.id) return mui.toast('您未上传头像')
  if (avatar.value?.status == 2) return mui.toast('您上传的头像正在审核')
  showImagePreview({
    images: [avatarUrl.value],
    showIndex: false,
    showIndicators: true
  })
}

// 是否显示修改头像弹层
const show = ref(false)
// 电脑端上传头像实例
const uploadAvatar = ref(null)

/**
 * 手机显示弹层
 * 电脑直接选择文件上传
 */
const showUpdateAvatar = () => {
  if (avatar.value?.status == 2) return mui.toast('您上传的头像正在审核，暂不支持修改')
  if (getApp.value('isPlus')) {
    show.value = true
  } else {
    uploadAvatar.value.uploadClick()
  }
}

/**
 * 修改头像
 * @param {String} url 头像路径
 */
const updateAvatar = async url => {
  try {
    await store.dispatch('server/GetTimestamp', '/user/avatar/update')
    const res = await UpdateAvatar({
      data: {
        id: avatar.value?.id || 0,
        url: Dense.decrypt(url)
      },
      time: props.systemTime,
      sign: 'md5'
    })
    await store.dispatch('user/GetUserInfo')
    showSuccessToast(res)
  } catch { }
}
</script>

<template>
  <!-- 头像 -->
  <van-cell title="头像" :is-link="true" :center="true" value-class="right"
    v-stat="{ type: 6, page: '/personalData', remarks: '显示修改头像弹窗' }" @click.stop="showUpdateAvatar">
    <template #value>
      <Avatar :src="avatarUrl" size="2.4rem" :alt="item.nickname || item.account"
        :primary-color="colorFade(getApp('primaryColor'), .6)" :inverse-color="getApp('inverseColor')"
        v-stat="{ type: 4, page: '/personalData', remarks: `查看头像图片路径为${avatarUrl}` }" @click.stop="openAvatar" />
    </template>
  </van-cell>

  <!-- 修改头像弹层 -->
  <upload-dialog ref="uploadAvatar" v-model:show="show" :token="item.token" address="picture"
    @success="updateAvatar"></upload-dialog>
</template>
