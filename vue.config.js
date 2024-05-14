const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PATH,

  // 去掉.map文件
  productionSourceMap: false,

  configureWebpack: config => {
    // 配置vant组件按需加载
    config.plugins.push(
      ComponentsPlugin({
        resolvers: [VantResolver()]
      })
    )

    // 配置全局对象或方法
    config.plugins.push(
      new webpack.ProvidePlugin({
        /**
         * 加解密对象
         * @type {Object}
         */
        Dense: ['@utils/dense.js', 'default'],

        /**
         * 日历转换对象
         * @type {Object}
         */
        Calendar: ['@utils/calendar.js', 'default'],

        /**
         * html5+的本地数据存储对象
         * @type {Object}
         */
        Storage: ['@utils/storage.js', 'default']
      })
    )

    // 配置打包的进度条
    config.plugins.push(
      new ProgressBarPlugin({
        format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      })
    )
  },
  chainWebpack: config => {
    // 去除打印和注释输出
    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.minimizer('terser').tap(args => {
        Object.assign(args[0].parallel, true)
        Object.assign(args[0].terserOptions, {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.error', 'alert']
          },
          format: {
            comments: false
          }
        })
        Object.assign(args[0].extractComments, false)
        return args
      })
    })

    // 解决vue-i18n的引用报错
    config.when(process.env.NODE_ENV === 'development', config => {
      config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
    })

    // 定义一些别名
    config.resolve.alias.set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@i18n', resolve('src/i18n'))
      .set('@router', resolve('src/router'))
      .set('@server', resolve('src/server'))
      .set('@store', resolve('src/store'))
      .set('@styles', resolve('src/styles'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@styles/mixin.scss";`
      }
    }
  },

  devServer: {
    proxy: {
      // 访问服务器的动态数据
      '/api': {
        target: process.env.VUE_APP_DEV_BASEURL,
        changeOrigin: true
      }
    }
  }
})
