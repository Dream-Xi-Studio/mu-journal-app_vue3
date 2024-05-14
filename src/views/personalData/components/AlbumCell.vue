<script setup>
import { computed } from 'vue'
import { showImagePreview } from 'vant'

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  baseURL: String
})

// 相册
const albums = computed(() => {
  return props.item?.album?.filter(item => item.status == 1).map(item => `${props.baseURL}${item.image}`)
})

/**
 * 查看图片
 */
const showPhotoAlbum = startPosition => {
  showImagePreview({
    images: albums.value,
    startPosition,
    showIndex: false,
    showIndicators: true
  })
}
</script>

<template>
  <div class="field">
    <div class="head" v-stat="{ type: 4, page: '/personalData', remarks: '查看相册列表' }"
      @click.stop="$router.push('/personalData/editPhotos')">
      <div class="title">我的相册</div>
      <van-icon name="arrow" />
    </div>
    <div class="album" v-if="albums?.length">
      <div v-for="(item, index) in albums" :key="index">
        <img :src="item" loading="lazy"
          v-stat="{ type: 4, page: '/personalData/editPhotos', remarks: `查看相册里面的图片路径为${item}` }"
          @click.stop="showPhotoAlbum(index)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  position: relative;
  padding: .48rem .6rem;

  &:active {
    background-color: var(--van-cell-active-color);
  }

  .head {
    @include tx(.56rem, .8rem);
    @include flex($justify: space-between, $align: center);

    .title {
      color: var(--van-cell-text-color);
    }

    >i {
      @include tx(.64rem, .96rem);
      color: var(--van-cell-right-icon-color);
    }
  }

  .album {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    >div {
      position: relative;
      padding: .16rem;
      width: 25%;
      aspect-ratio: 1;

      >img {
        @include size(100%);
        object-fit: cover;
        border-radius: .32rem;
      }
    }
  }
}
</style>
