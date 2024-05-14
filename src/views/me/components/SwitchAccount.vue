<script setup>
import { ref, reactive } from 'vue'
import { AddBehavior } from '@api/index'
import { colorFade } from '@utils/index'

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  users: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['addUser', 'deleteUser'])

// 定义是否显示退出弹层
const show = ref(false)

// 添加账号参数
const params = reactive({
  show: false,
  item: {
    account: '',
    password: ''
  }
})
const paramsJson = JSON.stringify(params.item)

/**
 * 显示添加账号弹层
 */
const showAddUser = () => {
  params.item = JSON.parse(paramsJson)
  params.show = true
}

/**
 * 登录添加账号
 */
const addUser = async () => {
  try {
    await AddBehavior({
      uuid: props.item.uuid,
      type: 2,
      page: '/home/me',
      remarks: '点击登录按钮'
    })
  } catch { }
  if (!params.item.account) return mui.toast('请输入账号')
  if (!params.item.password) return mui.toast('请输入密码')
  emit('addUser', {
    account: params.item.account,
    password: Dense.encrypt(params.item.password)
  })
}

/**
 * 切换账号
 * @param {Object} user
 */
const switchUser = user => {
  if (user.account == props.item.account) return
  emit('addUser', user)
}
</script>

<template>
  <van-cell title="账号切换" is-link center v-stat="{ type: 4, page: '/home/me', remarks: '查看账号列表' }"
    @click.stop="show = true" v-if="item.status == 1">
    <template #icon>
      <i class="iconfont mj-account-switching"></i>
    </template>
  </van-cell>

  <!-- 账号切换弹层 -->
  <van-popup v-model:show="show" position="bottom" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <div class="title">
      <strong>账号管理</strong>
      <div class="add" v-stat="{ type: 6, page: '/home/me', remarks: '新增账号弹窗' }" @click.stop="showAddUser">
        <van-icon name="plus" size=".56rem" />
      </div>
    </div>
    <div class="main">
      <van-swipe-cell v-for="user in users" :key="user.account">
        <div class="item" v-stat="{ type: 8, page: '/home/me', remarks: `切换账号为${user.account}` }"
          @click.stop="switchUser(user)">
          <div class="content">
            <!-- 头像 -->
            <Avatar :src="user.image" size="1.6rem" :alt="user.nickname || user.account"
              :primary-color="colorFade(item.primaryColor, .6)" :inverse-color="item.inverseColor" />

            <div class="info">
              <div class="nickname">{{ user.nickname || user.account }}</div>
              <div class="account">{{ user.account }}</div>
            </div>
          </div>

          <!-- 当前账号 -->
          <div class="icon" v-if="user.account == item.account">
            <van-icon name="success" size=".8rem" />
          </div>
        </div>

        <template #right v-if="user.account != item.account">
          <van-button class="delete" type="danger" text="删除" :square="true"
            v-stat="{ type: 2, page: '/home/me', remarks: `删除用户${user.account}` }"
            @click.stop="$emit('deleteUser', user.account)" />
        </template>
      </van-swipe-cell>
    </div>
  </van-popup>

  <!-- 添加账号弹层 -->
  <van-popup v-model:show="params.show" :round="true" :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    :close-on-popstate="true" teleport="body" :safe-area-inset-bottom="true">
    <div class="box">
      <div class="title">添加账号</div>
      <div class="frm">
        <!-- 账号 -->
        <van-field v-model="params.item.account" label="账号" type="tel" placeholder="请输入账号" :border="false"
          @keyup.enter="addUser" />

        <!-- 密码 -->
        <van-field v-model="params.item.password" label="密码" type="password" placeholder="请输入密码" :border="false"
          @keyup.enter="addUser" />

        <div class="btn">
          <van-button text="登录" :color="item.primaryColor" :loading="item.loading" :block="true" :round="true"
            @click.stop="addUser"></van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.title {
  position: relative;
  padding: .64rem 0;
  @include tx(.72rem, 1.04rem);
  text-align: center;
  @include line(bottom, $color: #ebedf0);

  .add {
    position: absolute;
    top: .24rem;
    right: 0.2rem;
    margin: .4rem;
    @include size(1rem);
    border-radius: 50%;
    background: var(--meng-primary-placeholder);
    @include center(flex);

    >i {
      color: var(--meng-inverse-color);
    }
  }
}

.main {
  position: relative;
  height: 12.8rem;
  overflow: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &:deep(.van-swipe-cell) {
    @include line(bottom, .6rem, .6rem, $color: #ebedf0);

    .item {
      position: relative;
      padding: .48rem .6rem;
      @include flex(space-between, center);


      .content {
        flex: 1;
        @include flex($align: center);

        .info {
          margin-left: .48rem;
          flex: 1;

          .nickname {
            @include tx(.56rem);
          }

          .account {
            margin-top: .32rem;
            @include tx(.48rem);
            color: #909399;
          }
        }
      }

      .icon {
        margin-left: .48rem;

        >i {
          color: var(--meng-primary-color);
        }
      }
    }

    &:last-child::after {
      content: none;
    }

    .van-swipe-cell__right {
      position: absolute;
      top: .48rem;
      height: 1.6rem;
      display: flex;

      >button {
        height: 100%;
      }
    }
  }
}

.box {
  position: relative;
  width: 75vw;

  .frm {
    padding: .48rem 0;

    &:deep(.van-cell) {
      --van-cell-vertical-padding: .48rem;
      --van-cell-horizontal-padding: .6rem;
      --van-cell-font-size: .56rem;
      --van-cell-line-height: .8rem;
      --van-field-label-color: rgba(51, 51, 51, 1);
      --van-cell-background: var(--meng-inverse-placeholder);
      --van-switch-on-background: var(--meng-primary-color);
      border-radius: .16rem;
    }

    .btn {
      margin: .8rem .6rem 0;

      >button {
        --van-button-default-height: 1.6rem;
        --van-button-default-line-height: 1.6rem;
        --van-button-normal-font-size: .64rem;
      }
    }
  }
}
</style>
