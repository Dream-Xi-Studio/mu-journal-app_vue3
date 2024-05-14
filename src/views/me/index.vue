<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Login } from '@api/user'
import { showSuccessToast } from 'vant'

const MyHeader = defineAsyncComponent(() => import('./components/MyHeader.vue'))
const SwitchAccount = defineAsyncComponent(() => import('./components/SwitchAccount.vue'))
const LogOut = defineAsyncComponent(() => import('./components/LogOut.vue'))

// 获取路由对象
const router = useRouter()
// 获取vuex对象
const store = useStore()
const getApp = computed(() => store.getters.getApp)
const getServer = computed(() => store.getters.getServer)
const getUser = computed(() => store.getters.getUser)

// 图片高度
const imageHeight = computed(() => `${getApp.value('height') + 9.84 * getApp.value('fontSize')}px`)

/**
 * 登录添加账号
 */
const addUser = async params => {
  try {
    await store.dispatch('server/GetSystemTime')
    const res = await Login({
      data: {
        ...params,
        uuid: getApp.value('uuid')
      },
      time: getServer.value('systemTime'),
      sign: 'sha256'
    })
    showSuccessToast('切换成功')
    Storage.set('user_id', JSON.parse(Dense.decrypt(res)).id)
    store.commit('user/SET', { info: res })
    await store.dispatch('user/GetUserInfo')
    // 添加账号到缓存
    store.dispatch('user/AddUser', {
      ...params,
      nickname: getUser.value('info').nickname,
      image: getUser.value('info').avatar?.status == 1 ? getUser.value('info').avatar?.image : ''
    })
    router.replace('/home')
  } catch { }
}

/**
 * 删除用户
 */
const deleteUser = async params => {
  const msg = await store.dispatch('user/DeleteUser', params)
  mui.toast(msg)
}

// 退出登录
const logOff = () => {
  if (!Object.keys(getUser.value('config'))?.length) {
    // 获取用户配置信息
    store.dispatch('user/GetUserConfig')
  }
  store.dispatch('user/LogOut')
  router.replace('/excessive')
}

store.dispatch('app/SetStatusBarStyle', 'light')
store.dispatch('user/GetUserInfo')
</script>

<template>
  <!-- 头部 -->
  <Suspense>
    <my-header :info="getUser('info')" :item="{
      imageHeight,
      primaryColor: getApp('primaryColor'),
      inverseColor: getApp('inverseColor'),
      baseURL: getServer('baseURL')
    }"></my-header>

    <template #fallback>
      <Skeleton :style="{ height: imageHeight }">
        <div class="info">
          <div class="title">
            <div class="avatar"></div>

            <div class="right">
              <div class="name"></div>

              <div class="bottom">
                <div class="btn"></div>
              </div>
            </div>
          </div>
          <div class="signature"></div>
        </div>
      </Skeleton>
    </template>
  </Suspense>

  <div class="purple" :style="{ '--app-status-bar': `${getApp('height')}px` }"></div>
  <div class="blue"></div>
  <div class="yellow"></div>

  <div class="body" :style="{ height: `calc(100vh - 1.6rem - ${imageHeight})` }">
    <div style="height: .4rem;"></div>
    <!-- 账号切换 -->
    <Suspense>
      <switch-account :item="{
        uuid: getApp('uuid'),
        account: getUser('info').account,
        status: getUser('info').status,
        loading: getServer('loading'),
        primaryColor: getApp('primaryColor'),
        inverseColor: getApp('inverseColor')
      }" :users="getUser('users')" @addUser="addUser" @deleteUser="deleteUser"></switch-account>

      <template #fallback>
        <Skeleton>
          <div class="paragraph"></div>
        </Skeleton>
      </template>
    </Suspense>

    <van-cell title="个性装扮" to="/me/personalizedDress" is-link center
      v-stat="{ type: 4, page: '/home/me', remarks: '查看个性装扮' }">
      <template #icon>
        <i class="iconfont mj-personalized-dress"></i>
      </template>
    </van-cell>

    <van-cell title="联系客服" to="/me/customerService" is-link center
      v-stat="{ type: 3, page: '/home/me', remarks: '跳转联系客服页面' }">
      <template #icon>
        <i class="iconfont mj-customer-service"></i>
      </template>
    </van-cell>

    <van-cell title="隐私与安全" to="/privacyAndSecurity" is-link center
      v-stat="{ type: 4, page: '/home/me', remarks: '查看隐私与安全' }">
      <template #icon>
        <i class="iconfont mj-security-and-privacy"></i>
      </template>
    </van-cell>

    <van-cell :title="`关于${getApp('name')}`" to="/about" is-link center
      v-stat="{ type: 4, page: '/home/me', remarks: `查看关于${getApp('name')}` }">
      <template #icon>
        <i class="iconfont mj-about"></i>
      </template>
    </van-cell>

    <!-- 退出 -->
    <Suspense>
      <log-out :item="{
        name: getApp('name'),
        systemName: getApp('systemName'),
        inverseColor: getApp('inverseColor'),
        isPlus: getApp('isPlus')
      }" @log-out="logOff"></log-out>

      <template #fallback>
        <Skeleton>
          <div class="paragraph"></div>
        </Skeleton>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
.info {
  position: absolute;
  left: .6rem;
  right: .6rem;
  bottom: .56rem;

  .title {
    @include flex($align: center);
    flex-wrap: nowrap;

    .avatar {
      @include size(2.4rem);
      border-radius: 50%;
      background: var(--van-active-color);
    }

    .right {
      margin-left: .48rem;
      flex: 1;

      .name {
        @include size(100%, .64rem);
        background: var(--van-active-color);
      }

      .bottom {
        margin-top: .4rem;
        display: flex;

        .btn {
          @include size(2.64rem, .88rem);
          border-radius: .48rem;
          background: var(--van-active-color);
        }
      }
    }
  }

  .signature {
    margin-top: .32rem;
    height: .72rem;
    background: var(--van-active-color);
  }
}

.purple,
.blue,
.yellow {
  position: fixed;
  @include size(5.44rem);
  border-radius: 50%;
  filter: blur(.08rem);
  z-index: 1;
}

.purple {
  top: calc(var(--app-status-bar) + 9.44rem);
  left: 0;
  background: rgba(249, 237, 255, 0.5);
}

.blue {
  right: 0;
  @include bottom(4.84rem);
  background: rgba(235, 245, 255, 0.5);
}

.yellow {
  left: 0;
  @include bottom(1.52rem);
  background: rgba(255, 245, 227, 0.5);
}

.body {
  position: relative;
  margin-top: -0.4rem;
  border-radius: .48rem;
  background: rgba($color: #fff, $alpha: 1);

  .paragraph {
    margin: .48rem 0;
    height: .96rem;
    background: var(--van-active-color);
  }

  &:deep(.van-cell) {
    --van-cell-vertical-padding: .4rem;
    --van-cell-horizontal-padding: .6rem;
    --van-cell-font-size: .56rem;
    --van-cell-background: transparent;
    margin: .48rem 0;
    z-index: 2;

    .iconfont {
      @include tx(.88rem);
    }

    .van-cell__title {
      margin-left: .16rem;
    }
  }
}
</style>
