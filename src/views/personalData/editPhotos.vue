<script setup>
import { defineAsyncComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { showImagePreview, showConfirmDialog, showSuccessToast } from 'vant'
import { AddAlbum, UpdateAlbum, DeleteAlbum } from '@api/user'

const UploadDialog = defineAsyncComponent(() => import('./components/UploadDialog.vue'))

// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
const getUser = computed(() => store.getters.getUser)

// 相册列表
const albums = computed(() => {
  return getUser.value('info')?.album?.map(item => {
    item.image = `${getServer.value('baseURL')}${item.image}`
    return item
  })
})

/**
 * 查看图片
 */
const showPhotoAlbum = (album, startPosition) => {
  if (album.status == 2) return mui.toast('您上传的照片正在审核')
  if (album.status == 3) return showConfirmDialog({
    title: '提示',
    message: `拒绝原因：${album?.remark || '无'}`,
    className: 'confirm_dialog',
    confirmButtonText: '替换',
    confirmButtonColor: getApp.value('primaryColor'),
    cancelButtonText: '删除',
    cancelButtonColor: '#ee0a24',
    closeOnClickOverlay: true
  }).then(() => {
    showUpdatePhoto(album?.id)
  }).catch(error => {
    if (error == 'cancel') {
      delPhoto(album?.id)
    }
  })
  showImagePreview({
    images: albums.value.filter(item => item.status == 1).map(item => item.image),
    startPosition,
    showIndex: false,
    showIndicators: true
  })
}

// 上传图片弹层参数
const upload = reactive({
  show: false,
  id: 0
})
// 电脑端上传头像实例
const uploadPhoto = ref(null)

/**
 * 手机显示弹层
 * 电脑直接选择文件上传
 */
const showUpdatePhoto = id => {
  if (getApp.value('isPlus')) {
    upload.show = true
  } else {
    uploadPhoto.value.uploadClick()
  }
  upload.id = id || 0
}

/**
 * 新增或修改照片
 * @param {String} url 图片路径
 */
const updatePhoto = async url => {
  try {
    let res
    if (upload.id) {
      await store.dispatch('server/GetTimestamp', '/user/album/update')
      // 修改
      res = await UpdateAlbum({
        data: {
          id: upload.id,
          image: Dense.decrypt(url)
        },
        time: getServer.value('systemTime'),
        sign: 'md5',
        salt: '<%Efn3n.U/-,2uEUk.<v8daW[u@j|^,*'
      })
    } else {
      await store.dispatch('server/GetTimestamp', '/user/album/add')
      res = await AddAlbum({
        data: Dense.decrypt(url),
        time: getServer.value('systemTime'),
        sign: 'md5',
        salt: 'B+(&LBu9~}Rq~9n3YtZVxepbK)?YdlMv'
      })
    }
    await store.dispatch('user/GetUserInfo')
    showSuccessToast(res)
  } catch { }
}

/**
 * 删除照片
 */
const delPhoto = async id => {
  if (getServer.value('loading')) return
  showConfirmDialog({
    title: '提示',
    message: '是否删除该照片？',
    className: 'confirm_dialog',
    confirmButtonColor: getApp.value('primaryColor'),
    closeOnClickOverlay: true
  }).then(async () => {
    try {
      await store.dispatch('server/GetTimestamp', '/user/album/delete')
      const res = await DeleteAlbum({
        data: id,
        time: getServer.value('systemTime'),
        sign: 'md5',
        salt: 'LLoz}CgnKTCQxQr(F,Ygnw|<v}>/=&*E'
      })
      await store.dispatch('user/GetUserInfo')
      showSuccessToast(res)
    } catch { }
  }).catch(() => { })
}
</script>

<template>
  <Layout :title="`编辑照片(${albums.length}/8)`">
    <div class="purple"></div>
    <div class="blue"></div>
    <div class="yellow"></div>

    <van-row class="main">
      <van-col span="6" v-for="(album, index) in albums" :key="index">
        <div class="item" v-stat="{ type: 4, page: '/personalData/editPhotos', remarks: `查看相册里面的图片路径为${album.image}` }"
          @click.stop="showPhotoAlbum(album, index)">
          <img :src="album.image" loading="lazy" />

          <div class="del" v-stat="{ type: 5, page: '/personalData/editPhotos', remarks: `是否删除相册里面的图片路径为${album.image}` }"
            @click.stop="delPhoto(album.id)" v-if="album.status == 1">
            <van-icon name="cross" size=".56rem" color="#fff" />
          </div>

          <div class="refuse" v-if="album.status == 3">审核拒绝</div>
        </div>
      </van-col>

      <van-col span="6" v-if="albums.length < 8">
        <div class="item" v-stat="{ type: 6, page: '/personalData/editPhotos', remarks: '显示添加相册弹窗' }"
          @click.stop="showUpdatePhoto(0)">
          <div class="add">
            <van-icon name="plus" size="1.2rem" color="#dcdee0" />
          </div>
        </div>
      </van-col>
    </van-row>

    <!-- 上传图片 -->
    <upload-dialog ref="uploadPhoto" v-model:show="upload.show" :token="getUser('info').token" address="album"
      @success="updatePhoto"></upload-dialog>
  </Layout>
</template>

<style lang="scss" scoped>
.purple,
.blue,
.yellow {
  position: fixed;
  @include size(5.44rem);
  border-radius: 50%;
  filter: blur(0.16rem);
}

.purple {
  top: calc(var(--app-status-bar) + 8rem);
  left: 0;
  background: rgba(249, 237, 255, 1);
}

.blue {
  right: 0;
  @include bottom(7.6rem);
  background: rgba(235, 245, 255, 1);
}

.yellow {
  left: 0;
  @include bottom(.8rem);
  background: rgba(255, 245, 227, 1);
}

$radius: .24rem;

.main {
  position: relative;
  padding: 0 .4rem;

  >div {
    margin: .4rem 0;
    @include center(flex);

    .item {
      position: relative;
      @include size(3.2rem);

      >img {
        @include size(100%);
        border-radius: $radius;
      }

      .del {
        position: absolute;
        top: 0;
        right: 0;
        @include size(.56rem);
        background: rgba(0, 0, 0, .7);
        border-radius: 0 0 0 .48rem;

        >i {
          position: absolute;
          top: 0;
          right: 0;
          transform: scale(.7) translate(10%, -10%);
        }
      }

      .refuse {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: .16rem 0;
        width: 100%;
        @include tx(.48rem, .72rem);
        color: #fff;
        text-align: center;
        background: rgba($color: #ee0a24, $alpha: .5);
      }

      .add {
        @include size(100%);
        border: .08rem solid var(--van-gray-3);
        border-radius: $radius;
        @include center(flex);
      }
    }
  }
}
</style>
