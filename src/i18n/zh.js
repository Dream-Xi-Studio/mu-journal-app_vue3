import { getModule } from '@utils/index'

const zh = getModule(require.context('./zh', true, /\.js$/)) || {}

export default {
  name: '中文',
  ...zh
}
