import { createStore } from 'vuex'
import getters from './getters'
import { getModule } from '@utils'

// 获取modules文件夹下的所有的仓库
const modules = getModule(require.context('./modules', true, /\.js$/))

export default createStore({
  modules,
  getters
})
