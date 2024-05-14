<script setup>
import { computed } from 'vue'
import { showImagePreview } from 'vant'
import { colorFade } from '@utils/index'

const props = defineProps({
  info: {
    type: Object,
    default: () => { }
  },
  item: {
    type: Object,
    default: () => { }
  }
})

// 相册
const albums = computed(() => {
  return props.info?.album?.filter(item => item.status == 1).map(item => `${props.item.baseURL}${item.image}`)
})

/**
 * 查看相册
 */
const showPhotoAlbum = startPosition => {
  const album = props.info?.album || []
  if (!album.length) return mui.toast('您未上传相册照片')
  if (!albums.value?.length) return mui.toast('您上传的相册照片正在审核')
  showImagePreview({
    images: albums.value,
    startPosition: startPosition || void 0,
    showIndex: false,
    showIndicators: true
  })
}

// 头像
const avatar = computed(() => {
  const avatar = props.info?.avatar || {}
  if (avatar.status == 1) {
    return `${props.item.baseURL}${avatar.image}`
  } else {
    return ''
  }
})

/**
 * 查看头像
 */
const openAvatar = () => {
  const avatarObj = props.info?.avatar || {}
  if (!avatarObj.id) return mui.toast('您未上传头像')
  if (avatarObj.status != 1) return mui.toast('您上传的头像正在审核')
  showImagePreview({
    images: [avatar.value],
    showIndex: false,
    showIndicators: true
  })
}

</script>

<template>
  <div class="header">
    <van-swipe :autoplay="4000" :indicator-color="item.primaryColor" :style="{ '--meng-image-height': item.imageHeight }">
      <van-swipe-item v-for="(image, index) in albums" :key="index">
        <img class="swipe-image" :src="image" loading="lazy"
          v-stat="{ type: 4, page: '/home/me', remarks: `查看相册里面的图片路径为${image}` }" @click.stop="showPhotoAlbum(index)" />
      </van-swipe-item>

      <van-swipe-item v-if="!albums?.length">
        <img class="swipe-image" src="../images/album.jpg" loading="lazy"
          v-stat="{ type: 8, page: '/home/me', remarks: '点击默认背景图' }" @click.stop="showPhotoAlbum" />
      </van-swipe-item>
    </van-swipe>

    <div class="info">
      <div class="title">
        <Avatar :src="avatar" size="2.4rem" :alt="info.nickname || info.account"
          :primary-color="colorFade(item.primaryColor, .6)" :inverse-color="item.inverseColor"
          v-stat="{ type: 4, page: '/home/me', remarks: `查看头像图片路径为${avatar}` }" @click.stop="openAvatar" />
        <div class="right">
          <div class="name">
            <i class="iconfont" :class="['', 'mj-male', 'mj-female'][info?.gender || 0]" v-if="info.gender"></i>
            <span>{{ info.nickname || info.account }}</span>
          </div>
          <div class="bottom">
            <div class="btn" v-stat="{ type: 4, page: '/home/me', remarks: '查看个人资料页面' }"
              @click.stop="$router.push('/personalData')">编辑资料</div>
          </div>
        </div>
      </div>
      <div class="signature">{{ info.personalizedSignature }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  background: var(--meng-inverse-color);

  &:deep(.van-swipe) {
    --van-swipe-indicator-margin: .72rem;
    --van-swipe-indicator-size: .2rem;

    .swipe-image {
      @include size(100%, var(--meng-image-height));
      object-fit: cover;
      filter: brightness(70%);
    }

    .van-swipe__indicators {
      left: auto;
      right: .6rem;
      transform: none;

      .van-swipe__indicator:not(:last-child) {
        margin-right: .16rem;
      }
    }
  }

  .info {
    position: absolute;
    left: .6rem;
    right: .6rem;
    bottom: .56rem;
    pointer-events: none;

    .title {
      @include flex($align: center);
      flex-wrap: nowrap;

      &:deep(.avatar) {
        pointer-events: auto;
      }

      .right {
        margin-left: .48rem;
        flex: 1;

        .name {
          width: 100%;
          @include tx(.64rem);
          color: #fff;
          @include omit();

          >i {
            margin-right: .16rem;
            color: var(--meng-primary-color);
          }
        }

        .bottom {
          margin-top: .4rem;
          display: flex;

          .btn {
            padding: .16rem .32rem;
            @include tx(.48rem);
            color: var(--meng-primary-color);
            border: 1px solid var(--meng-primary-color);
            border-radius: .48rem;
            pointer-events: auto;
          }
        }
      }
    }

    .signature {
      margin-top: .32rem;
      @include tx(.48rem, .72rem);
      color: rgba($color: #fff, $alpha: 1);
      @include omit(2);
    }
  }
}
</style>
