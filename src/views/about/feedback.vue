<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as imageConversion from 'image-conversion'
import { showFailToast, showSuccessToast } from 'vant'
import Upload from '@server/upload'
import { AddFeedback } from '@api/index'

// 获取路由对象
const router = useRouter()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)

// 已上传的文件列表
const fileList = ref([])
// 反馈表单
const params = reactive({
  describe: '',
  images: [],
  phone: ''
})

/**
 * 文件读取完成后的回调函数
 */
const afterRead = async (file, detail) => {
  file.status = 'uploading'
  file.message = '上传中...'
  let event = file.file
  // 如果图片过大，则进行压缩
  if (event.size > 1048576) {
    const res = await imageConversion
      .compressAccurately(event, 888)
      .catch(() => {
        showFailToast('图片大小不能大于1MB')
      })
    event = new File([res], event.name, {
      type: res.type,
      lastModified: Date.now()
    })
  }
  const param = new FormData()
  param.append('file', event)
  param.append('path', 'feedback')
  try {
    const res = await Upload(param)
    file.status = ''
    file.message = ''
    params.images[detail?.index] = Dense.decrypt(res)
  } catch {
    fileList.value.splice(detail?.index, 1)
    showFailToast('上传失败')
  }
}

/**
 * 删除不要的图片
 */
const deleteUploader = (file, detail) => {
  params.images.splice(detail?.index, 1)
}

/**
 * 提交
 */
const submit = async () => {
  if (params.describe?.length < 10) {
    return mui.toast('请填写10字以上的问题描述以便我们提供更好的帮助')
  } else if (params.describe?.length > 200) {
    return mui.toast('问题和意见长度不能超过200字符')
  }
  if (params.phone && !/^1[3-9]\d{9}$/.test(params.phone)) return mui.toast('手机号码格式有误')
  try {
    await store.dispatch('server/GetTimestamp', '/system/feedback/add')
    const res = await AddFeedback({
      data: {
        describe: params.describe,
        images: params.images?.join('|') || void 0,
        phone: params.phone || void 0
      },
      time: getServer.value('systemTime'),
      sign: 'md5',
      salt: 'S=WC(Q~G&^i>QHb@Ikj24kjZT[E`AkSx'
    })
    showSuccessToast(res)
    params.images = []
    router.back()
  } catch { }
}
</script>

<template>
  <Layout>
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <div class="frm">
      <!-- 问题和意见 -->
      <van-field v-model="params.describe" label="问题和意见" type="textarea" maxlength="200"
        placeholder="请填写10字以上的问题描述以便我们提供更好的帮助" :border="false" clearable
        :autosize="{ minHeight: 0.8 * getApp('fontSize') * 4, maxHeight: 0.8 * getApp('fontSize') * 4 }"
        show-word-limit />

      <!-- 图片（选填，提供问题截图） -->
      <van-field label="图片（选填，提供问题截图）" :border="false">
        <template #input>
          <van-uploader v-model="fileList" preview-size="3.2rem" :multiple="true" :after-read="afterRead"
            :max-size="1024 * 1024" :max-count="2" @delete="deleteUploader" />
        </template>
      </van-field>

      <!-- 联系电话 -->
      <van-field v-model="params.phone" label="联系电话" type="tel" placeholder="选填，便于我们与您联系" :border="false" />

      <van-button text="确定" :color="getApp('primaryColor')" :block="true" :round="true" :loading="getServer('loading')"
        v-stat="{ type: 2, page: '/about/feedback', remarks: '提交意见反馈' }" @click.stop="submit"></van-button>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.purple,
.blue,
.yellow {
  position: fixed;
  @include size(5.44rem);
  border-radius: 50%;
  filter: blur(.16rem);
}

.purple {
  top: calc(var(--app-status-bar) + 7.8rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(4.8rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.4rem);
  background: rgba(255, 245, 227, 1);
}

.frm {
  position: relative;
  padding: 0 .6rem;

  &:deep(.van-cell) {
    --van-cell-vertical-padding: .56rem;
    --van-cell-horizontal-padding: .6rem;
    --van-cell-font-size: .56rem;
    --van-cell-line-height: .8rem;
    --van-field-label-color: rgba(51, 51, 51, 1);
    --van-cell-background: var(--meng-inverse-placeholder);
    margin: 1.2rem 0;
    border-radius: 0.16rem;

    .van-uploader__upload {
      margin: 0;
    }
  }

  >button {
    margin-top: 3.2rem;
    --van-button-default-height: 1.92rem;
    --van-button-default-line-height: 1.92rem;
    --van-button-normal-font-size: .64rem;
  }
}
</style>
