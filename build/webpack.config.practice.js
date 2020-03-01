const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')// 合并配置插件
const baseConfig = require('./webpack.config.base')

let config

const devServer = {
  contentBase: path.join(__dirname, '../dist'),
  port: 8080,
  host: 'localhost',
  overlay: { // 将错误信息直接输出到浏览器
    errors: true
  },
  hot: true,  //修改了一个组件的代码，只更新当前组件的数据效果，不会导致整个界面都刷新
  open: false // 自动打开浏览器
}
const defaultPlugins = [
  // 双引号必须加
  new webpack.DefinePlugin({
    'process.env': "development"
  }),
  // htmlPlugin
  new HTMLPlugin({
    template: path.join(__dirname, "./template.html")
  })
]

// 合并webpack配置
// 不用担心baseConfig会被修改
config = merge(baseConfig, {
  entry: path.join(__dirname, "../practice/index.js"),
  devtool: '#cheap-module-eval-source-map', // 帮助调试代码，source map 代码映射
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader', //  将vue中的css进行热加载
          {
            loader: 'css-loader',
            // options: {
            //   module: true,
            //   localIdentName: isDev ? "[path]-[name]-[hash:base64:5]" : "[hash:base64:5]"
            // }
          },
          {
            loader: 'postcss-loader', // css 后处理
            options: {
              sourceMap: true // 可以直接使用之前的sorceMap，使编译速度更快
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import vue from vue
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')  // 指定vue版本，调试版本vue，演示代码
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),// 热更新
    // new webpack.NoEmitOnErrorsPlugin()// 避免展示一些不必要的信息的插件,webpack4 已取消
  ])
})


module.exports = config
